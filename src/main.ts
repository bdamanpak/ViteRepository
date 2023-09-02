import "./style.css"


const app = document.querySelector<HTMLDivElement>("#app");

type BoxStuffType = {
  element: string;
  attr?: any;
  children?: string | string[] | Element | Element[] | null;
};

const Box = (probs: BoxStuffType) => {
  const el = document.createElement(probs.element);
  el.className = probs.attr?.className;
  el.id = probs.attr?.id;
  if (!Array.isArray(probs.children)) el.append(probs.children!);
  else el.append(...probs.children);
  return el;
};

const title = Box({
  element: "h2",
  attr: {
    className: "my-6 mt-7 text-2xl font-bold"
  },
  children: "Contacts"
});

const nameSection = Box({
  element: "input",
  attr: {
    className: "flex items-center border-solid border-2 border-zinc-800 rounded-xl px-4 py-4 gap-3",
    id: "nameInput"
  }
});

const nameSectionElement = nameSection as HTMLInputElement;
nameSectionElement.placeholder = "Enter The Name";


const phoneSection = Box({
  element: "input",
  attr: {
    className: "flex items-center border-solid border-2 border-zinc-800 rounded-xl px-4 py-4 gap-3",
    id: "phoneInput"
  }
});

const phoneSectionElement = phoneSection as HTMLInputElement;
phoneSectionElement.placeholder = "Enter The Phone Number";



const SIMCheckbox = Box({
  element: "INPUT",
});
SIMCheckbox.setAttribute("type", "checkbox");

const SIMLabel = Box({
  element: "LABEL",
  children: "SIM"
});


const SIM = Box({
  element: "div",
  attr: {
    className: "flex gap-2"
  }, 
  children: [SIMCheckbox, SIMLabel]
});


const phoneCheckbox = Box({
  element: "INPUT",
});
phoneCheckbox.setAttribute("type", "checkbox");

const phoneLabel = Box({
  element: "LABEL",
  children: "PHONE"
});


const phoneS = Box({
  element: "div",
  attr: {
    className: "flex gap-2"
  }, 
  children: [phoneCheckbox, phoneLabel]
});


const saveOptions = Box({
  element: "div",
  attr: {
    className: "flex justify-between"
  },
  children: [SIM, phoneS]
});


const saveBTNelement = Box({
  element: "button",
  attr: {
    className: "border-solid border-2 border-zinc-100 text-zinc-100 bg-zinc-800 rounded-xl px-14 py-3",
    id: "saveBTN"
  },
  children: "Save Contact"
});

const showBTNInput = Box({
  element: "button",
  attr: {
    className: "border-solid border-2 border-zinc-100 text-zinc-100 bg-zinc-800 rounded-xl px-14 py-3",
    id: "showBTN"
  },
  children: "Show Contacts"
});


const btnSection = Box({
  element: "div",
  attr: {
    className: "flex justify-between py-5 mb-6"
  },
  children: [saveBTNelement, showBTNInput]
});



const containerForm = Box({
  element: "div",
  attr: {
    className: "mx-auto my-auto bg-zinc-100 flex flex-col gap-5 px-12 mt-44 font-mono rounded-xl"
  },
  children: [title, nameSectionElement, phoneSectionElement, saveOptions, btnSection]
});
containerForm.style.maxWidth = "600px";



app?.appendChild(containerForm);


/////////// types
export type ContactType = {
  ID: string;
  contactName: string;
  contactPhone: string;
};

export type ContactListType = ContactType [];

export type ContactInfoType = {
  contactNameInfo: string;
  contactPhoneInfo: string;
};



/////////// importers
export const nameInput = document.querySelector<HTMLInputElement>("#nameInput");
export const phoneInput = document.querySelector<HTMLInputElement>("#phoneInput");
export const showBTNElement = document.querySelector<HTMLButtonElement>("#showBTN");
export const contactsDrawer = document.querySelector<HTMLInputElement>("#contactListDrawer");
export const closingDrawerIcon = document.querySelector<HTMLButtonElement>("#closingDrawer");
export const saveBTNElement = document.querySelector<HTMLButtonElement>("#saveBTN");



/////////// functions
export const listItemCreation = (contact: ContactInfoType): HTMLLIElement => {

  const listItem = document.createElement("li");

  const contactNameElement = document.createElement("h2");
  contactNameElement.innerText = contact.contactNameInfo;

  const contactPhoneElement = document.createElement("p");
  contactPhoneElement.innerText = contact.contactPhoneInfo;

  listItem.className = "py-4 px-4";
  contactNameElement.className = "text-zinc-600 font-bold";
  contactPhoneElement.className = "text-zinc-500";

  listItem.appendChild(contactNameElement);
  listItem.appendChild(contactPhoneElement);

  return listItem;
};

export const fieldsValidation = (...fields: string[]): boolean => {
  return fields.every((field) => !!field.toString());
};

export const contactsInputsValidation = (contact: ContactInfoType) => {
  if(!fieldsValidation(contact.contactNameInfo, contact.contactPhoneInfo)){
      alert("INPUT ERROR !!!!");
      throw Error("INPUT ERROR !!!!");
  };
};



/////////// events
const contactsList: ContactListType = [];

export const createContact = () => {
    const newContact: ContactType = {
        ID: crypto.randomUUID(),
        contactName: nameInput?.value ?? "",
        contactPhone: phoneInput?.value ?? ""
    };

    const contactInfo: ContactInfoType = {
        contactNameInfo: newContact.contactName,
        contactPhoneInfo: newContact.contactPhone
    };

    contactsInputsValidation(contactInfo);

    contactsList.push(newContact);

    const listItem = listItemCreation(contactInfo);
    contactsDrawer?.appendChild(listItem);

};


export const openDrawer = () => {
    contactsDrawer?.classList.remove("hidden");
};

export const closeDrawer = () => {
    contactsDrawer?.classList.add("hidden");
};




saveBTNElement?.addEventListener("click", createContact);
showBTNElement?.addEventListener("click", openDrawer);
closingDrawerIcon?.addEventListener("click", closeDrawer);






