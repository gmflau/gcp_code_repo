// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/* eslint-disable no-unused-vars */

// [START functions_helloworld_http]
// [START functions_helloworld_get]
const functions = require('@google-cloud/functions-framework');
// [END functions_helloworld_get]
const escapeHtml = require('escape-html');
// [END functions_helloworld_http]

const split = require('split');

const {Storage} = require('@google-cloud/storage');
const gcs = new Storage();

// [START functions_helloworld_storage]
/**
 * Generic background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} file The Cloud Storage file metadata.
 * @param {object} context The event metadata.
 */
exports.helloGCS = (file, context) => {
  console.log(`  Event: ${context.eventId}`);
  console.log(`  Event Type: ${context.eventType}`);
  console.log(`  Bucket: ${file.bucket}`);
  console.log(`  File: ${file.name}`);
  console.log(`  Metageneration: ${file.metageneration}`);
  console.log(`  Created: ${file.timeCreated}`);
  console.log(`  Updated: ${file.updated}`);
};
// [END functions_helloworld_storage]


// Pick up a JSON file from a GCS bucket and store the data as Hash in Redis
exports.cacheload = (info, context) => new Promise((resolve, reject) => {
     const bucket = gcs.bucket(info.bucket);
     const file = bucket.file(info.name);          
     let keysWritten = 0;
     file.createReadStream()
       .on('error', error => reject(error))
       .on('response', (response) => {
         // connection to GCS opened
       }).pipe(split()) // convert to lines
       .on('data', function (line) {
         if (!line || line === "") return;
         keysWritten++;
         const data = JSON.parse(line);
         console.log(data);
//         redis.set(data.key, line, 'EX', process.env.EXPIRY, redis.print);
       })
       .on('end', () => {
         console.log(`Keys written: ${keysWritten}`);
         resolve();
       })
       .on('error', error => reject(error));
 });
