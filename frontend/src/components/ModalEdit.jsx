import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const updates = Object.fromEntries(formData);
//   // await updateContact(params.contactId, updates);
//   // return redirect(`/contacts/${params.contactId}`);
// }

const ModalEdit = ({ openModal, setOpenModal, mode, id }) => {
  const [formValue, setFormValue] = useState({});
  const { data } = useLoaderData();

  useEffect(() => {
    setFormValue(...data.filter((item) => item.id === id));
  }, [id]);

  console.log(formValue);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal show={openModal} size="xl" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <Form>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Actualizar Valores
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="year" value="Año" />
              </div>
              <TextInput
                id="year"
                type="number"
                name="year"
                value={formValue.year}
                required
                disabled
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="value" value="Valor" />
              </div>
              <TextInput
                type="number"
                id="value"
                name="value"
                value={formValue.value}
                required
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Button type="submit">Update</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEdit;
