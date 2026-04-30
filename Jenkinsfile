pipeline {
    agent {
        kubernetes {
            yaml """
kind: Pod
spec:
  securityContext:
    fsGroup: 1000
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command:
    - sleep
    args:
    - infinity
    volumeMounts:
      - name: harbor-config
        mountPath: /kaniko/.docker
  volumes:
  - name: harbor-config
    projected:
      sources:
      - secret:
          name: harbor-regcred
          items:
            - key: .dockerconfigjson
              path: config.json
"""
        }
    }

    environment {
        HARBOR_REGISTRY = "harbor.bilgem.tubitak.gov.tr"
        HARBOR_PROJECT  = "tmp"  // Sadece yetkimiz olan proje
        IMAGE_TAG       = "latest"
    }

    stages {


        // 'Create Harbor Config' stage'i tamamen SİLİNDİ.
        // Çünkü secret mount edildiği an dosya hazır.

        stage('Build & Push Backend') {
            steps {
                container('kaniko') {
                    sh """
                    /kaniko/executor \
                    --context=${WORKSPACE}/todo-backend \
                    --dockerfile=${WORKSPACE}/todo-backend/Dockerfile \
                    --destination=${HARBOR_REGISTRY}/${HARBOR_PROJECT}/todo-backend:${IMAGE_TAG} \
                    --insecure \
                    --skip-tls-verify \
                    --snapshot-mode=redo \
                    --use-new-run \
                    --compression=zstd \
                    --compression-level=1
                    """
                }
            }
        }

        stage('Build & Push Frontend') {
            steps {
                container('kaniko') {
                    sh """
                    /kaniko/executor \
                    --context=${WORKSPACE}/todo-frontend \
                    --dockerfile=${WORKSPACE}/todo-frontend/Dockerfile \
                    --destination=${HARBOR_REGISTRY}/${HARBOR_PROJECT}/todo-frontend:${IMAGE_TAG} \
                    --insecure \
                    --skip-tls-verify \
                    --snapshot-mode=redo \
                    --use-new-run \
                    --compression=zstd \
                    --compression-level=1
                    """
                }
            }
        }
    }
}
