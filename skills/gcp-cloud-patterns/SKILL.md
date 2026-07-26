---
name: gcp-cloud-patterns
description: Production infrastructure patterns for deploying Machine Learning, GenAI, and web applications on Google Cloud Platform (GCP). Covers Vertex AI, GKE, BigQuery, Cloud Storage, and Terraform standards.
license: MIT
metadata:
  origin: EAG
---

# GCP Cloud Infrastructure Patterns

Use this skill when architecting, reviewing, or deploying ML/AI applications to Google Cloud Platform (GCP). It enforces security, scalability, and cost-aware design for data pipelines and model endpoints.

## Core Principles

1. **Service Accounts (IAM):** Always use dedicated Service Accounts for each workload with Workload Identity Federation instead of exporting service account keys (`.json`).
2. **Infrastructure as Code (IaC):** All infrastructure must be defined in Terraform.
3. **Data Locality:** Ensure GCS buckets, BigQuery datasets, and Vertex AI jobs are collocated in the same region (or multi-region) to avoid cross-region egress costs.

## Vertex AI vs GKE vs Cloud Run

- **Vertex AI:** Default choice for distributed ML training, hyperparameter tuning, and managed model serving (Endpoints). Integrates natively with MLflow and BigQuery.
- **Cloud Run:** Use for stateless, CPU-bound API gateways, web interfaces, and lightweight RAG orchestrators. Scale-to-zero is excellent for cost savings.
- **GKE (Kubernetes):** Use for highly custom GPU workloads (e.g., L4/A100 slices via time-sharing or MIG), Triton Inference Server, or when portability is strictly required.

## Example: Secure Vertex AI & GCS via Terraform

When provisioning storage and roles for Vertex AI training jobs, enforce uniform bucket-level access and strict IAM roles.

```hcl
resource "google_storage_bucket" "ml_data" {
  name                        = "company-ml-data-lake-prod"
  location                    = "US"
  uniform_bucket_level_access = true
  versioning {
    enabled = true
  }
}

resource "google_service_account" "vertex_training_sa" {
  account_id   = "vertex-training-sa"
  display_name = "Service Account for Vertex AI Training"
}

# Grant read access to the specific bucket
resource "google_storage_bucket_iam_member" "vertex_s3_read" {
  bucket = google_storage_bucket.ml_data.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.vertex_training_sa.email}"
}

# Grant Vertex AI user role
resource "google_project_iam_member" "vertex_user" {
  project = var.project_id
  role    = "roles/aiplatform.user"
  member  = "serviceAccount:${google_service_account.vertex_training_sa.email}"
}
```

## BigQuery Data Engineering

- Always partition tables by date (e.g., `_PARTITIONTIME`) and cluster by frequently filtered columns (e.g., `user_id`, `tenant_id`) to drastically reduce query costs.
- Do not use `SELECT *` in production ETLs. Always specify columns explicitly to minimize bytes scanned.

## Operational Readiness Checklist
- [ ] Terraform state is stored in a GCS bucket with versioning enabled.
- [ ] Billing Budgets and Alerts are configured at the Project folder level.
- [ ] GKE node pools utilize Spot VMs for non-critical batch ML workloads, with taints to prevent standard pods from landing on GPU nodes.
- [ ] Workload Identity is enabled on all GKE clusters.
