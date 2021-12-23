const placeInput = (elem, value) => {
  elem.focus();
  elem.val(value);
};

const updateEditForm = (title, description, url, is_private, category) => {
  placeInput($("#title-edit"), title);
  placeInput($("#description-edit"), description);
  placeInput($("#url-edit"), url);
  placeInput($("#category-edit"), category);
  $("#category-edit").formSelect();
};

const showEditResourceModal = async (resourceId) => {
  const [resourceDetails] = await getDetailsOfResources(resourceId);
  const { title, url, description, is_private, category_id, catergory } = resourceDetails;
  const $editResourceForm = $("#edit-resource-form");
  const $editModalContent = $(`#${resourceId}-edit-form-modal`);
  $editModalContent.append($editResourceForm);
  console.log(catergory);
  updateEditForm(title, description, url, is_private, catergory);
  $editResourceForm.show();
  console.log(resourceId);
  console.log(resourceDetails);
};

const closeEditModal = () => {
  $("#title-edit").val("");
  $("#description-edit").val("");
  $("#url-edit").val("");
  $("#edit-Resource-form").hide();
};




