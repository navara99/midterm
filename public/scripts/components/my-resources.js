const createThumbnail = (is_video, media_url) => {
  const videoHeight = 150;
  const media = is_video
    ? createEmbedVideo(media_url, videoHeight)
    : createScreenshot(media_url);
  return $(`
  <div class="thumbnail-container">
    <div class="media">
      ${media.prop("outerHTML")}
    </div>
  </div>
`);
};

const createInfo = (
  title,
  url,
  description,
  category,
  created_on,
  username
) => {
  return $(`
  <div class="text">
    <h6 class="my-resource-title">${title}</h6>
    <div><span>URL: </span><a href="${url}" class="paragraph truncate">${url}</a></div>
    <div><span>Description: </span> ${description}</div>
    <div><span>Added by: </span> @${username}</div>
    <div><span>Added:</span> ${timestampToTimeAgo(created_on)}</div>
    <div><span>Category:</span> ${category[0] + category.substring(1).toLowerCase()}</div>
  </div>
  `);
};

const registerMyResourceButtonsListeners = (resourceId, isMine) => {
  if (!isMine) return;

  $(`#${resourceId}-delete`).on("click", async function (e) {
    const [id] = $(this).attr("id").split("-");
    const result = await deleteResource(id);
    console.log(result);
  });

  $(`#${resourceId}-edit`).on("click", function (e) { });

};

const getActionButtons = (resourceId, isMine) => {
  const noButtons = !isMine ? "invisible" : "";
  const resourceOptions = `
  <a id = "${resourceId}-edit" class="waves-effect waves-light btn my-resource-action ${noButtons}">
    <i class="material-icons left">
      edit
    </i>
      Edit
  </a>
  <a id = "${resourceId}-delete" class="waves-effect waves-light btn my-resource-action ${noButtons}">
    <i class="material-icons left">
      delete
    </i>
      Delete
  </a>
  `;

  return resourceOptions;
}

const getStats = (likes, ratings, comments, resourceId, isMine) => {

  return $(`
  <div class="stat-container">
    <div class="stat">
      <span class="stat-column">
        <span class="fas fa-star card-icon bright"></span>
        <span>${Number(ratings) ? Number(ratings).toFixed(1) : "0"}</span>
      </span>
      <span class="stat-column">
        <span class="fas fa-heart card-icon liked"></span>
        <span>${likes}</span>
      </span>
      <span class="stat-column">
        <span class="fas fa-comment-alt card-icon"></span>
        <span>${comments}</span>
      </span>
    </div>
    <div class="resource-actions">
      ${getActionButtons(resourceId, isMine)}
     </div>
</div>
  `);
};

const clearMyResources = () => {
  $("#my-resource-list").remove();
};

const renderMyResources = async () => {
  try {
    clearMyResources();
    const { id } = await getMyDetails();
    const myResources = await getMyResources();

    const $listContainer = $("<ul>")
      .attr("id", "my-resource-list")
      .addClass("collection comments");

    myResources.forEach((resource) => {
      const {
        id: resourceId,
        user_id,
        title,
        description,
        url,
        media_url,
        created_on,
        is_video,
        is_liked,
        likes,
        category,
        number_of_comment,
        rating,
        username,
      } = resource;

      const showLiked =
        $("#liked-filter:checked").val() &&
        Number(is_liked) === 1 &&
        user_id !== id;
      const showMine = $("#mine-filter:checked").val() && user_id === id;

      if (showLiked || showMine) {
        const $collection = $("<li>");
        $collection.addClass("collection-item");
        const $thumbnail = createThumbnail(is_video, media_url);
        const $info = createInfo(
          title,
          url,
          description,
          category,
          created_on,
          username
        );
        const isMine = user_id === id;
        const $stats = getStats(likes, rating, number_of_comment, resourceId, isMine);
        $collection.prepend($thumbnail, $info, $stats);
        $listContainer.prepend($collection);
        $("#my-resources-details").append($listContainer);
        registerMyResourceButtonsListeners(resourceId, isMine);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const registerCheckListeners = async () => {
  $("#liked-filter").on("change", function () {
    renderMyResources();
  });

  $("#mine-filter").on("change", function () {
    renderMyResources();
  });
};
