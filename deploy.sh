DOCKER_IMAGE_NAME="fizzvr/credibility:latest"

echo "Building docker image"
docker build  -t fizzvr/credibility:latest .

echo "Deploying to our docker registry"
echo "$DOCKER_PASSWORD" | docker login -u $DOCKER_USER --password-stdin
docker push $DOCKER_IMAGE_NAME


echo "Deploying to our VPS"
ssh $SSH_HOST_STRING ./deploy.sh
