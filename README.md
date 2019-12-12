# docker-aws-hop

Fix https://github.com/aws/aws-sdk-php/issues/1908
Fix the instance running this container to allow 2 hop in PUT metadata request

## Usage

```
$ docker run --rm jderusse/aws-hop
```

## Permission

In order to run the container, the EC2 instance must have the `ec2:ModifyInstanceMetadataOptions` permission

## swarm deployment

docker service create --mode global --name aws-hop --restart-condition on-failure jderusse/aws-hop
