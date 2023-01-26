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
} from "../../../store/actions/articles";

const AdminArticles = () => {
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          />
        </>
      </div>
    </>
  );
};

export default AdminArticles;
