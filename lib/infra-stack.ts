import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create lambda function
    const demolambda = new lambda.Function(this, 'demolambda', {
      runtime: lambda.Runtime.PYTHON_3_12,
      code: lambda.Code.fromAsset('../services/'),
      handler: 'lambda_function.lambda_handler',
      functionName: 'demolambda'
    });

    // create cloudwatch alarm 
    
    const errorAlarm = new cloudwatch.Alarm(this, 'cloudwatchalarm', {
      metric: demolambda.metricErrors(),
      threshold: 1,
      evaluationPeriods: 1,
      alarmName: 'demolambda-errorAlarm'
    });
    
}
}
