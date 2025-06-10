// AWS Signature V4 implementation for browser
async function sha256(message: string): Promise<ArrayBuffer> {
  const msgBuffer = new TextEncoder().encode(message);
  return await crypto.subtle.digest('SHA-256', msgBuffer);
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmac(key: ArrayBuffer | string, message: string): Promise<ArrayBuffer> {
  const keyBuffer = typeof key === 'string' ? new TextEncoder().encode(key) : key;
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const msgBuffer = new TextEncoder().encode(message);
  return await crypto.subtle.sign('HMAC', cryptoKey, msgBuffer);
}

export async function getS3Object(accessKeyId: string, secretAccessKey: string, s3Url: string) {
  const url = new URL(s3Url);
  const bucket = url.hostname.split('.')[0];
  const key = url.pathname.slice(1); // Remove leading /
  
  const region = 'us-east-1';
  const service = 's3';
  const now = new Date();
  const isoDate = now.toISOString().replace(/[:\-]|\.\d{3}/g, '');
  const dateStamp = isoDate.slice(0, 8);
  
  // Create canonical request
  const method = 'GET';
  const canonicalUri = `/${key}`;
  const canonicalQuerystring = '';
  const canonicalHeaders = `host:${url.hostname}\nx-amz-date:${isoDate}\n`;
  const signedHeaders = 'host;x-amz-date';
  const payloadHash = await sha256('');
  
  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuerystring,
    canonicalHeaders,
    signedHeaders,
    toHex(payloadHash)
  ].join('\n');
  
  // Create string to sign
  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    algorithm,
    isoDate,
    credentialScope,
    toHex(await sha256(canonicalRequest))
  ].join('\n');
  
  // Calculate signature
  const kDate = await hmac(`AWS4${secretAccessKey}`, dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  const kSigning = await hmac(kService, 'aws4_request');
  const signature = toHex(await hmac(kSigning, stringToSign));
  
  // Create authorization header
  const authorization = `${algorithm} Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  
  // Make the request
  const response = await fetch(s3Url, {
    headers: {
      'Authorization': authorization,
      'x-amz-date': isoDate
    }
  });
  
  if (!response.ok) {
    throw new Error(`S3 request failed: ${response.status} ${response.statusText}`);
  }
  
  const text = await response.text();
  return JSON.parse(text);
}

const mock = {
  article_text:
    '{"body": "A school has many people who work together. These people help to make school a good place to learn. They are called school leaders. Each leader has special jobs that keep the school running smoothly every day.\\n\\nThe principal is an important school leader. The principal makes sure the school is safe for everyone. They help teachers do their jobs well and solve big problems. When students have big problems, they can talk to the principal. Principals also make important rules for the school.\\n\\nTeachers are also school leaders. A teacher helps students learn new things in many subjects like reading and math. They make the class fun and exciting with interesting activities. Teachers help students when they don\'t understand something and cheer for them when they do well.\\n\\nSome schools have a counselor. A counselor helps students who feel sad or mad about things at school or home. They teach students how to be good friends and solve problems with words. A counselor makes sure school is fair for everyone and that all students have what they need to learn.\\n\\nThe school nurse is another leader you might see. The nurse helps when students get hurt or feel sick during the school day. They check students\' eyes and ears to make sure they can see and hear well. They teach students how to stay healthy by washing hands and eating good food too.\\n\\nStudents can be leaders too! Some students help their friends with hard work. Some keep the classroom clean by picking up trash and organizing books. Others make sure games at recess are fair for all kids by including everyone who wants to play.\\n\\nAll these leaders work together to make school a happy place. They help everyone learn and grow each day. Next time you are at school, look for all the leaders who help you every day!", "questions": [{"question": "A teacher helps students learn new things in _____.", "answer": "class"}, {"question": "School leaders work together to make ______ a good place to learn.", "answer": "school"}, {"question": "The counselor makes sure school is ______ for everyone.", "answer": "fair"}, {"question": "Some students ______ their friends with hard work.", "answer": "help"}, {"question": "Based on the article, school leaders probably want students to feel ______ at school.", "answer": "happy"}]}',
}
