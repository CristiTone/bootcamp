async function init() {
  const res = await fetch("https://dummyjson.com/products?limit=10");
  const resolved = await res.json();
  render(resolved.products);
}

function render(items) {
  const itemsContainer = document.querySelector(".items-container");
  items.forEach((item) => {
    const title = document.createElement("h4");
    const titleContent = document.createTextNode(item.title);
    title.appendChild(titleContent);

    const description = document.createElement("span");
    const descriptionContent = document.createTextNode(item.description);
    description.appendChild(descriptionContent);

    const btn = document.createElement("button");
    const btnContent = document.createTextNode("X");
    btn.appendChild(btnContent);
    btn.addEventListener("click", () => deleteItem(item.id));

    const itemCard = document.createElement("li");
    itemCard.appendChild(title);
    itemCard.appendChild(description);
    itemCard.appendChild(btn);
    itemCard.setAttribute("id", `product-${item.id}`);

    itemsContainer.appendChild(itemCard);
  });
}

async function loadMore() {
  const renderedItems = document.querySelectorAll("li");
  const res = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${renderedItems.length}`
  );
  const resolved = await res.json();
  render(resolved.products);
}

async function deleteItem(id) {
  await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE",
  });
  const item = document.querySelector(`#product-${id}`);
  item.remove();
}

async function handleSubmit(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="title"]');
  const description = document.querySelector('input[name="description"]');

  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
    }),
  });
  const resolved = await res.json();
  render([resolved]);
  title.value = "";
  description.value = "";
}
