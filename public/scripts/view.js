$(() => {
  $(".tabs").tabs();
  $("select").formSelect();

  updateUserInfo();
  eventListeners();
  updateView("resources");
});

const eventListeners = () => {
  headerButtonsEventListener();
  loginEventListener();
  registerEventListener();
  newResourceEventListener();
  changePasswordEventListener();
  updateProfileEventListener();
  profileButtonsEventListener();
};

const updateTitleURL = (title, url) => {
  const newURL = `http://localhost:8080/${url}`;
  window.history.pushState("data", "Title", newURL);
  document.title = `${title} - Resource Wall`;
};

const updateUserInfo = async (userInfo) => {
  try {
    if (!userInfo) userInfo = await getMyDetails();
    updateHeader(userInfo);
  } catch (err) {
    updateHeader({});
  }
};

const handleError = () => {
  const $errorMessage = $("#error-message");
  return (newMsg) => {
    $errorMessage.text(newMsg);
  };
};

const viewHandler = () => {
  const $resourcesPage = $("#resources-page");
  const $registerPage = $("#register-page");
  const $loginPage = $("#login-page");
  const $profilePage = $("#profile-page");
  const $changePasswordPage = $("#change-password-page");
  const $newResourcePage = $("#new-resource-page");
  const $resourceDetails = $("#resource-details");
  const $errorPage = $("#error-page");
  const $myResourcesPage = $("#my-resources-page");

  const updateView = (nextView, userInfo, resourceDetails) => {
    if(nextView !== "error") {
      updateUserInfo(userInfo);
      $newResourcePage.hide();
      $resourcesPage.hide();
      $registerPage.hide();
      $loginPage.hide();
      $profilePage.hide();
      $changePasswordPage.hide();
      $resourceDetails.hide();
      $errorPage.hide();
      $myResourcesPage.hide();
    }

    switch (nextView) {
      case "resources":
        displayResources();
        $resourcesPage.show();
        updateTitleURL("Home", "");
        break;
      case "myResources":
        showMyResources();
        $myResourcesPage.show();
        updateTitleURL("My Resources", "my-resources");
        break;
      case "likedResources":
        showLikedResources();
        $myResourcesPage.show();
        updateTitleURL("Liked Resources", "liked-resources");
        break;
      case "changePassword":
        showChangePasswordPage();
        $myResourcesPage.show();
        updateTitleURL("Change Password", "liked-resources");
        break;
      case "updateProfile":
        showUpdateProfilePage();
        $myResourcesPage.show();
        updateTitleURL("Update Profile", "update-profile");
        break;
      case "register":
        $registerPage.show();
        updateTitleURL("Register", "register");
        break;
      case "login":
        $loginPage.show();
        updateTitleURL("Login", "login");
        break;
      case "newResource":
        $newResourcePage.show();
        updateTitleURL("Create New Resource", "create-resource");
        break;
      case "resourceDetails":
        updateResourceDeailsPage(resourceDetails)
        .then(() => {
          console.log(resourceDetails);
          $resourceDetails.show();
          const { title, id } = resourceDetails[0];
          const titleSmall = title.toLowerCase();
          updateTitleURL(`${title} - Resource Details`, `resource/${id}`);
        });
        break;
      case "error":
        $errorPage.show();
        updateTitleURL("Error", "error");
        break;
    }
  };
  return updateView;
};

const updateView = viewHandler();
const {
  showUpdateProfilePage,
  profileButtonsEventListener,
  prefillProfileForm,
  showChangePasswordPage,
  showMyResources,
  showLikedResources,
} = profilePageHandler();

const updateResourceDeailsPage = updateResourceDetails();
