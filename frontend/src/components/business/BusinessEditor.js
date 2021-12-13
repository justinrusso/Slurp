import PropTypes from "prop-types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

import Box from "../styled/Box";
import Container from "../styled/Container";
import InputField from "../common/InputField";
import Typography from "../common/Typography";
import { Button } from "../styled/Button";
import {
  createNewBusiness,
  deleteBusiness,
  selectBusiness,
  updateBusiness,
} from "../../store/businesses";

const InputWrapper = styled.div`
  margin: ${(props) => props.theme.spacing.gen(1.5, 0)};
  display: inline-flex;
  width: 100%;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.spacing.gen(2)};
`;

const BusinessEditor = ({ addNew }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();

  const business = useSelector(selectBusiness(businessId || 0));

  const businessData = business || {};

  const [name, setName] = useState(businessData.name || "");
  const [description, setDescription] = useState(
    businessData.description || ""
  );
  const [address, setAddress] = useState(businessData.address || "");
  const [city, setCity] = useState(businessData.city || "");
  const [state, setState] = useState(businessData.state || "");
  const [zipCode, setZipCode] = useState(businessData.zipCode || "");
  const [displayImage, setDisplayImage] = useState(
    businessData.displayImage || ""
  );

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goBack = () => {
    history.push(businessId ? `/biz/${businessId}` : "/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    setErrors({});

    const payload = {
      name,
      description,
      address,
      city,
      state,
      zipCode,
      displayImage,
    };

    try {
      if (addNew) {
        await dispatch(createNewBusiness(payload));
      } else {
        await dispatch(updateBusiness(businessId, payload));
      }
      goBack();
    } catch (res) {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteBusiness(businessId));
      history.push("/");
    } catch {
      goBack();
    }
  };

  return (
    <Box paddingBottom="48px">
      <Container>
        <Typography color="primary" variant="h2">
          {addNew ? "Add a Business" : "Update Business Details"}
        </Typography>
        <form id="business-editor" onSubmit={handleSubmit}>
          <InputWrapper>
            <InputField
              label="Business Name"
              fullWidth
              id="business-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{
                autoFocus: true,
                type: "text",
              }}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              label="Business Image URL"
              fullWidth
              id="business-image"
              value={displayImage}
              onChange={(e) => setDisplayImage(e.target.value)}
              inputProps={{
                type: "text",
              }}
              error={!!errors.displayImage}
              helperText={errors.displayImage}
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              label="Business Description"
              fullWidth
              id="business-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{
                type: "text",
                as: "textarea",
                rows: 3,
              }}
              error={!!errors.description}
              helperText={errors.description}
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              label="Address"
              fullWidth
              id="business-address1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              inputProps={{
                type: "text",
              }}
              error={!!errors.address}
              helperText={errors.address}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              label="City"
              fullWidth
              id="business-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              inputProps={{
                type: "text",
              }}
              error={!!errors.city}
              helperText={errors.city}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              label="State"
              fullWidth
              id="business-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              inputProps={{
                type: "text",
              }}
              error={!!errors.state}
              helperText={errors.state}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <InputField
              label="ZIP"
              fullWidth
              id="business-zip-code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              inputProps={{
                type: "text",
              }}
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              required
            />
          </InputWrapper>
        </form>
        <Actions>
          <div>
            <Button form="business-editor" type="submit">
              {addNew ? "Add a Business" : "Submit Changes"}
            </Button>
            <Button
              type="button"
              variant="text"
              color="secondary"
              onClick={goBack}
            >
              Cancel
            </Button>
          </div>
          {!addNew && (
            <div>
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </Actions>
      </Container>
    </Box>
  );
};

BusinessEditor.defaultProps = {
  addNew: false,
};

BusinessEditor.propTypes = {
  addNew: PropTypes.bool,
};

export default BusinessEditor;
