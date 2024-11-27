import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import ViewProfileTab from "./ViewProfileTab";
import { useParams } from "react-router-dom";
import axios from "axios";
import ViewProfilePosts from "./ViewProfilePosts";

const ViewProfile = () => {
  const params = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        await axios.get(`${import.meta.env.VITE_BASE_API_URL}/user/${params.username}`).then((res) => {
          setUserDetails(res.data.data);
          setLoading(false);
          setUserId(res.data.data._id);
        }).catch((err) => {
          console.log(err)
          setLoading(false);
        }
        );
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }

    getProfile();
  }, [params])

  return (
    <main className="max-w-7xl mx-auto mt-8">
      {/* tab */}
      <div className="flex items-center justify-center">
        <Tabs defaultValue="account" className="md:w-[700px] w-[200px]">
          <TabsList className='w-full'>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <ViewProfileTab user={userDetails}/>
          </TabsContent>
          <TabsContent value="posts" className=''>
            <ViewProfilePosts userId={userId}/>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default ViewProfile