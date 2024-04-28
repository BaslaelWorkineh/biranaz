# TODO: 

- ### start creating nodes 
- ### create custome edges and edgetypes
- ### make the diagram persistent to a remote database
- ### create more diagram types and make isolated diagraming tool for each.


Add Exposables :
    -Add exposables to reminder,sideEffect and document nodes [exposables are viariables that a node exposes to other nodes ]



Conditioner Node:
    -Conditioner nodes need to have some kind of method to query for an output.

    example:

            is studentData(documentNode).count > classSeats(documentNode).count :
                do this and this 



- new connector node : 
    -should be able to accept multiple boolean values and batch operate a certain truth Operator and give some output.
    -it should also pass all exposables alongside the output value.
