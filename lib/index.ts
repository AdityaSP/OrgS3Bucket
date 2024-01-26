import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import { EventType } from 'aws-cdk-lib/aws-s3';


export interface OrgS3BucketProps {
  // Define construct properties here
}

export class OrgS3Bucket extends Construct {

  constructor(scope: Construct, id: string, props: OrgS3BucketProps = {}) {
    super(scope, id);

    const lambdaname = cdk.Fn.importValue('alert-lambda-name-export')
  
    // const getalertLambda = cdk.aws_lambda.Function.fromFunctionArn(this, 'getalertlambda', 'arn:aws:lambda:us-east-1:008239258920:function:ObjectAlertStack-alertLambda155CC12E-SqgCwpMO7AbI')

    const getalertLambda = cdk.aws_lambda.Function.fromFunctionName(this, 'getalertlambda', lambdaname)

    const s3bucket = new cdk.aws_s3.Bucket(this, 'objectalerts3');
    s3bucket.addEventNotification(EventType.OBJECT_CREATED, new cdk.aws_s3_notifications.LambdaDestination(getalertLambda))
    s3bucket.addEventNotification(EventType.OBJECT_REMOVED, new cdk.aws_s3_notifications.LambdaDestination(getalertLambda))

  }
}
