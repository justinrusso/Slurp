import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { selectBusiness } from "../../store/businesses";
import ErrorPage from "../common/ErrorPage";

const PhotoHeader = styled.div`
  position: relative;
  height: 426px;
  width: 100%;
`;

const BusinessPage = () => {
  const { businessId } = useParams();

  const business = useSelector(selectBusiness(businessId));

  return business ? <PhotoHeader></PhotoHeader> : <ErrorPage />;
};

export default BusinessPage;
