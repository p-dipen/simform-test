import React, { PureComponent } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Alert, Container, Row, Form, Col } from "react-bootstrap";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const backGround = ["primary", "secondary", "success", "danger", "warning"];
const getItemStyle = (isDragging, draggableStyle, index) => ({
  userSelect: "none",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: `5px`
});

class Skills extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: props.skills
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    this.setState(() => ({
      items: nextProps.skills
    }));
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.props.onchangeskills(items);
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Container
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  isDragDisabled={
                    item.skill === "" || item.skill == null ? true : false
                  }
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        item.id - 1
                      )}
                    >
                      <Alert
                        key={item.id}
                        variant={backGround[item.id - 1]}
                        style={{
                          opacity:
                            item.skill === "" || item.skill == null
                              ? "0.5"
                              : "1"
                        }}
                      >
                        <Form.Group as={Row} style={{ marginBottom: 0 }}>
                          <Form.Label column sm="1">
                            {index + 1}.
                          </Form.Label>
                          <Col sm="10">
                            <Form.Control
                              value={item.skill}
                              placeholder="Add skill"
                              // readOnly={!onFocus}
                              name={index}
                              onChange={this.props.onchnageskill}
                              style={{ background: "inherit" }}
                              required
                            />
                          </Col>
                          <Col sm="1">
                            {item.skill !== "" && (
                              <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={() => this.props.ondestoryskill(index)}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            )}
                          </Col>
                        </Form.Group>
                      </Alert>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Skills;
