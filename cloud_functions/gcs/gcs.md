## README for running "cacheload" cloud function

#### 1. Deploy "cacheload" cloud function
```
gcloud functions deploy cacheload \  
--runtime nodejs16 \
--trigger-resource gml_json_redis_test \
--trigger-event google.storage.object.finalize
```

#### 2. Export a JSON file from a BigQuery table into the bucket
In GCP Cloud Console, export a JSON file from a BigQuery table to bucket named "gml_json_redis_test"

#### 3. See the output in JSON format in Cloud Functions logs
```
gcloud functions logs read --limit 100
```


