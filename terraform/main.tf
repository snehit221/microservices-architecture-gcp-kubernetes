provider "google" {
  project = "gke-a3"
}

resource "google_container_cluster" "gke_cluster" {
  name     = "microservices-gke-cluster"
  location = "us-central1-c"
  enable_autopilot = false
  initial_node_count = 1

  node_config {
    machine_type = "e2-micro"
    image_type   = "COS_CONTAINERD"

    disk_type = "pd-standard"  // Use "disk_type" for boot disk configuration
    disk_size_gb = 10
  }
  #Update deletion_protection to false
  deletion_protection = false
}