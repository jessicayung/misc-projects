# Layer-wise supervised incremental training of residual networks

[AI-ON.org](ai-on.org) open research project. Category: Fundamental Research. 

Launched October 2016. [Mailing list here](https://groups.google.com/forum/#!forum/aion-incremental-training-of-residual-networks).

## Problem description

**Hypothesis**: Due to their structure, it may be that residual modules [1] could be trained incrementally, starting from a previous, shallower net learned with full supervision. 
* **Reason**: At each step, the network would learn an additional residual module, which would be an additional non-linear feature representation of the input that is fed into the previous module — the classifier. 
  * **Reading**: A useful reading to help intuition of this effect is [2], which gives an ensemble-like interpretation of residual networks. 


**Benefits**: 
* The re-use of the previously trained layers should **save computational time**. 
* Moreover, it is possible to show that at each step we are learning in a strictly larger model space, of which network learned in the previous step is the optimal model when we zero-out the weights of the new residual units just added.

**Status of hypothesis in the field**: Some approaches for incremental learning have been recently investigated [3, 4]. They share some intuition with this one. But the approaches in [3, 4] try to solve the more general problem of transfer learning and are not specifically tailored to residual networks.



## Why this problem matters

Efficient layer-wise training of deep networks could allow us to **significantly speed up training of large models**. It is one of the long-standing "dreams" of deep learning, but has proven elusive so far. 

### Measure of success
Devise an efficient layer-wise method of training deep networks that performs competitively with end-to-end trained models while providing computational benefits. 
-> it would quickly be adopted across the entire field.

## Datasets (examples)
[CIFAR10](https://www.cs.toronto.edu/~kriz/cifar.html) - small scale classification.  
[MS COCO](http://mscoco.org) - smaller scale classification, detection, segmentation.  
[ImageNet](http://image-net.org) - large-scale classification.  
[OpenImages](https://github.com/openimages/dataset) - large-scale classification.  
Others ?

## References
1: [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)  
2: [Residual Networks are Exponential Ensembles of Relatively Shallow Networks](https://arxiv.org/abs/1605.06431)  
3: [Net2Net: Accelerating Learning via Knowledge Transfer](https://arxiv.org/abs/1511.05641)  
4: [Progressive Neural Networks](https://arxiv.org/abs/1606.04671)  
