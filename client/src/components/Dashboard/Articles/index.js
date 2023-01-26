import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PaginateComponent from "./paginate";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { LinkContainer } from "react-router-bootstrap";
import { AdminTitle } from "../../../utils/helper";
import {
  getPaginateArticles,
  changeArticleStatus,
  removeArticle,
} from "../../../store/actions/articles";

const AdminArticles = () => {
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [removeAlert, setRemoveAlert] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const handleModalClose = () => setRemoveAlert(false);

  const handleModalShow = (id = null) => {
    setToRemove(id);
    setRemoveAlert(true);
  };

  const goToPrevPage = (page) => {
    dispatch(getPaginateArticles({ page }));
  };

  const goToNextPage = (page) => {
    dispatch(getPaginateArticles({ page }));
  };

  const goToEdit = (id) => {
    navigate(`/dashboard/articles/edit/${id}`);
  };

  const handleStatusChange = (status, _id) => {
    let newStatus = status === "draft" ? "public" : "draft";
    dispatch(changeArticleStatus({ newStatus, _id }));
  };

  const handleDelete = () => {
    dispatch(removeArticle(toRemove))
      .unwrap()
      .finally(() => {
        setRemoveAlert(false);
        setToRemove(null);
      });
  };

  useEffect(() => {
    dispatch(getPaginateArticles({}));
  }, []);

  return (
    <>
      <AdminTitle title="Articles" />
      <div className="articles_table">
        <ButtonToolbar className="mb-3">
          <ButtonGroup className="me-2">
            <LinkContainer to="/dashboard/articles/add">
              <Button variant="secondary">Add articles</Button>
            </LinkContainer>
          </ButtonGroup>
          <form>
            <InputGroup>
              <InputGroup.Text id="btngroup1">@</InputGroup.Text>
              <FormControl type="text" placeholder="search" />
            </InputGroup>
          </form>
        </ButtonToolbar>
        <>
          <PaginateComponent
            articles={articles.adminArticles}
            goToPrevPage={(page) => goToPrevPage(page)}
            goToNextPage={(page) => goToNextPage(page)}
            goToEdit={(id) => goToEdit(id)}
            handleStatusChange={(status, id) => handleStatusChange(status, id)}
            handleModalShow={(id) => handleModalShow(id)}
          />
        </>
        <Modal show={removeAlert} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
            <Modal.Body>This process cannot be undone.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => handleDelete()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal.Header>
        </Modal>
      </div>
    </>
  );
};

export default AdminArticles;
