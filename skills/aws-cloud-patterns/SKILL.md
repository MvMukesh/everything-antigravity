---
name: aws-cloud-patterns
description: Production infrastructure patterns for deploying Machine Learning, GenAI, and web applications on AWS. Covers SageMaker, ECS/EKS, S3 Data Lakes, Bedrock, and Terraform/CDK standards.
license: MIT
metadata:
  origin: EAG
---

# AWS Cloud Infrastructure Patterns

Use this skill when architecting, reviewing, or deploying ML/AI applications to Amazon Web Services (AWS). It enforces security, scalability, and cost-aware design for data pipelines and model endpoints.

## Core Principles

1. **Least Privilege IAM:** Roles must be scoped to specific buckets (`arn:aws:s3:::my-bucket/*`) and specific actions. Never use `*` policies in production.
2. **Infrastructure as Code (IaC):** All infrastructure must be defined in Terraform or AWS CDK. No click-ops.
3. **Data Gravity:** Compute should live near the data. Train models in the same region as the S3 data lake to avoid egress costs.
4. **Spot Instances for ML:** Use EC2 Spot Instances (via SageMaker or EKS) for hyperparameter tuning and batch inference, falling back to On-Demand only for time-critical online inference.

## SageMaker vs ECS/EKS

- **SageMaker:** Use for managed distributed training, built-in MLflow integration, and rapid model deployment without managing containers.
- **ECS (Fargate):** Use for CPU-bound web services, API gateways, and lightweight RAG retrieval microservices.
- **EKS (Kubernetes):** Use when you need custom GPU node pools (e.g., Karpenter), custom CUDA runtimes, or multi-cloud parity.

## Example: Secure S3 & IAM via Terraform

When provisioning buckets for ML training data, always enforce encryption, versioning, and strict IAM boundaries.

```hcl
resource "aws_s3_bucket" "ml_data" {
  bucket = "company-ml-data-lake-prod"
}

resource "aws_s3_bucket_versioning" "ml_data_versioning" {
  bucket = aws_s3_bucket.ml_data.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "ml_data_encryption" {
  bucket = aws_s3_bucket.ml_data.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# IAM Role for SageMaker Training Job
resource "aws_iam_role_policy" "sagemaker_s3_access" {
  name = "SageMakerS3ReadAccess"
  role = aws_iam_role.sagemaker_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Effect   = "Allow"
        Resource = [
          aws_s3_bucket.ml_data.arn,
          "${aws_s3_bucket.ml_data.arn}/*"
        ]
      },
    ]
  })
}
```

## Amazon Bedrock Integration

When using AWS Bedrock for LLMs (Claude, Llama):
- Always configure Provisioned Throughput for high-QPS applications to avoid rate limiting.
- Never hardcode the model ARN; inject it via environment variables or Secrets Manager so models can be swapped easily during fallback.

## Operational Readiness Checklist
- [ ] Terraform state is stored in a secured S3 bucket with DynamoDB locking.
- [ ] AWS Cost Explorer budgets/alarms are configured for GPU instance types (`p4d`, `g5`).
- [ ] VPC Endpoints are used to access S3/SageMaker from private subnets to avoid NAT Gateway data processing charges.
