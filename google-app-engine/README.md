### GAE(Flask-Python-App)=>VPC-Connector=>NGINX(Internal-IP/TLS)=>REDB
    
1. Follow this repo: https://github.com/Redislabs-Solution-Architects/redis-enterprise-cloud-gcp/tree/main/gke/access-via-nginx-server-tls/README.md    
For internal Nginx gateway address:
```
kubectl apply -f nginx-ingress-controller-private-ip.yaml
```
For external Nginx gateway address:
```
kubectl apply -f nginx-ingress-controller.yaml
```
       
2. Create VPC Connector
```
gcloud compute networks vpc-access connectors create glau-gae-us-central1 \
--region=us-central1 \
--network=default \
--min-instances=2 \
--max-instances=10 \
--range="10.8.0.0/28" \
--machine-type=e2-micro
```
      
3. Deploy GAE app
```
gcloud app deploy
```
    
4. View GAE app log
```
gcloud app logs tail -s default
```
    
