import { Select, Option, Input, Button } from '@material-tailwind/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreatePost = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({});
  const [creationError, setCreationError] = useState('');
  const [loading, setLoading] = useState(false);
  // console.log(formData);

  const postCreation = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_BASE_API_URL}/post/create`, formData, { withCredentials: true, credentials: 'include' })
        .then((res) => {
          setLoading(false);
          setCreationError(null);
          toast.success("Post created successfully!");
          setTimeout(() => {
            navigation(`/post/${res?.data?.data?.slug}`);
          }, 1000)
        }).catch((err) => {
          setCreationError(err?.response?.data?.message);
          setLoading(false);
        })
    } catch (error) {
      setCreationError("something went wrong");
    }
  }

  return (
    <section className="">
      <div className="max-w-[1100px] h-screen mx-auto mt-5">
        <form className="flex flex-col max-w-4xl mx-auto gap-5" onSubmit={postCreation}>
          <div className="flex flex-col gap-3">
            <h1 className="uppercase font-semibold tracking-wide">Category</h1>
            <div className="max-w-xl">
              <Select
                label="Select Category"
                color="blue"
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 }
                }}
                id="category"
                // value={formData.category}
                className="dark:text-white"
                onChange={(value) => setFormData({ ...formData, topic: value })}
              >
                <Option value="Valorant">Valorant</Option>
                <Option value="General">General</Option>
                <Option value="Site Discussion">Site Discussion</Option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="uppercase font-semibold tracking-wide">Title</h1>
              <p className="text-gray-600 text-[13px]">cannot be edited after submission</p>
            </div>
            <Input
              label="Title"
              id="title"
              color="blue"
              className="dark:text-white"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="uppercase font-semibold tracking-wide">Text</h1>
            <ReactQuill
              theme="snow"
              id="content"
              placeholder="Enter your post content here..."
              className="dark:text-white h-72"
              onChange={(value) => setFormData({ ...formData, content: value })}
              required
            />
          </div>
          <Button
            type="submit"
            className="mt-9"
            variant="gradient"
            color="blue"
            disabled={loading}
            loading={loading}
          >
            Post
          </Button>
        </form>
        {creationError && <p className="text-red-500 text-center mt-5">{creationError}</p>}
      </div>
    </section>
  )
}

export default CreatePost