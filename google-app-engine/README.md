### GAE(Flask-Python-App)=>VPC-Connector=>NGINX(Internal-IP/TLS)=>REDl-on-GKEB
    
#### 1. Create a runtime environment
Follow this repo: https://github.com/Redislabs-Solution-Architects/redis-enterprise-cloud-gcp/tree/main/gke/access-via-nginx-server-tls/README.md to create a runtime environment
     
For internal Nginx proxy IP address:
```
kubectl apply -f nginx-ingress-controller-private-ip.yaml
```
For external Nginx proxy IP address:
```
kubectl apply -f nginx-ingress-controller.yaml
```
       
#### 2. Create VPC Connector
```
gcloud compute networks vpc-access connectors create glau-gae-us-central1 \
--region=us-central1 \
--network=default \
--min-instances=2 \
--max-instances=10 \
--range="10.8.0.0/28" \
--machine-type=e2-micro
```
      
#### 3. Deploy GAE app
```
gcloud app deploy
```
    
#### 4. View GAE app log
```
gcloud app logs tail -s default
```
    
