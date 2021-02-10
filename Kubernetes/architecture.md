# Architecture

## Declarative model and desiered state

Declarative model: describe the desiered state in a manifest file (what we want the cluster to look like). This is pushed to the api server and kubernetes provides us with this state.

Kubernetes will at all times check if the observed state matches the desiered state. If it does not it will take action to fix this.

## Masters

manages stuff, the control panel consists of multiple master nodes, that has to be linux\
Have backups, 3 or 5 is good. There is one leader, and the other are followers sending requests via the leader. If this goes down a new leader is selected. Every master runs every master component.
In kubernetes you don't have directly access to the master, this is managed for you.

Kube-apiserver: front end to control panel. Cluster nodes, micorservices and the services talk together via the apiserver using a REST api.

Cluster store: config, state of the cluster is here.

Kube-controller-manager: controller of controllers (node, deployment, endpointd, namespace etc). runs on a loop, looking for changes from the desiered state of the cluster.

Kube-scheduler: watches api server for new work tasks, assigns work to cluster nodes.

Ex. change state: call to apiserver that stores the desiered state in the cluster store. The scheduler deligates to some nodes to change the cluster state and the controller manager watches to see that the desiered state is with-held.

## Nodes

runs miro services\
a node is windows or linux

Kubelet: main kubernetes agent (runs on every kubernetes agent). registeres the node with cluster and the scheduler. Watches API server for tasks (pods) and executes these. reports status to master.

container runtime: can be docker or container runtime interface, low level container intelligence. builds and starts containers

kube-proxy: network components, assigns a IP to each pod, load-balancing between pods.

### Pods

Containers in kubernetes run inside a pod. You can run multiple containers within the same pod.

A pod is a shared execution environment. It can contain multiple things like an IP, some memory etc.Multiple containers in the same pod share the same environment.

Creating more pods is the way of scaling, not more containers in the same pod.

## Networking

Pods are mortal, mening of they go down they die and are replaced by another pod with the same content, except the IP is not the same.

In order to not have to update all communication between pods all the time, we have a service containing stable names and IPs for the pods. These values will never change. The reqests are deligated by the service to get to the right place.\
Pods are "added" to the load balancer and the service by labels.

Services only send traffic to healthy pods
