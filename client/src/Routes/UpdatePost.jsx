import { Select, Option, Input, Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
    const params = useParams();
    const [formData, setFormData] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [publishError, setPublishError] = React.useState('');
    const { currentUser } = useSelector((state) => state.user);
    const navigation = useNavigate();

    // console.log(params);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://valo-info-api.vercel.app/api/v1/post/getposts?postId=${params.postId}`)
            .then((res) => {
                // console.log(res?.data?.data?.posts[0]);
                setLoading(false);
                setFormData(res?.data?.data?.posts[0]);

            }).catch((err) => {
                setLoading(false);
                // console.log(err);
                setPublishError(err?.response?.data?.message);
            })
    }, [params.postId])

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.put(`https://valo-info-api.vercel.app/api/v1/post/update/${params.postId}/${currentUser._id}`, formData, { withCredentials: true, credentials : "include" }).then((res) => {
                setLoading(false);
                setTimeout(() => {
                    navigation(`/post/${res?.data?.data?.slug}`);
                }, 700)
            }).catch((err) => {
                console.log(err);
                setPublishError(err?.response?.data?.message);
                setLoading(false);
            })
        } catch (error) {
            setPublishError("something went wrong");
            setLoading(false);
        }
    }

    return (
        <section className="">
            <div className="max-w-[1100px] h-screen mx-auto mt-5">
                <form className="flex flex-col max-w-4xl mx-auto gap-5" onSubmit={handleUpdateSubmit}>
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
                                defaultValue={formData.topic}
                                value={formData.topic}
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
                            disabled
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
                            value={formData.content}
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
                        Update
                    </Button>
                </form>
                {publishError && <p className="text-red-500 text-center mt-5">{publishError}</p>}
            </div>
        </section>
    )
}

export default UpdatePost