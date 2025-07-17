import { useEffect, useState } from "react";
import ProfileCard from "../../components/Items/Profile/ProfileCard";
import Cover from "../../components/UI/Cover";
import PostsPage from "./Posts";
import BasicInfo from "../../components/Items/Profile/BasicInfo";
import SummaryProfile from "../../components/Items/Profile/SummaryProfile";
import { useAuthStore } from "../../store/useAuthStore";
import { EditCardModal } from "../../components/Modal/EditCardModel";
import { EditProfileModal } from "../../components/Modal/EditProfileImageModel";


const Profile = () => {

    const [activeTab, setActiveTab] = useState("Your Posts");
    const [activeModal, setActiveModal] = useState<'basic' | 'summary' | 'profile' | null>(null);
    const {user,getMyProfile,profileLoading,formSumitLoading,editMyProfile,uploadProfileImage} = useAuthStore();
    const renderTabContent = (tab: string) => {
        switch (tab) {
            case "Your Posts":
                return <PostsPage />;
            default:
                return null;
        }
    }

    const handleSave = async(data: any) => {
       if(activeModal === 'basic') {
            const { college, company, address, skills } = data;
            await editMyProfile({ 
                    college,
                    company,
                    address,
                    skills: skills || [],
            }, 'basic');
        }
        if(activeModal === 'summary') {
            const { bio } = data;
            await editMyProfile({ 
                bio: bio || "",
            }, 'summary');
        }
        if(activeModal === 'profile') {
            const { profileImg } = data;
            await editMyProfile({ 
                profileImg: profileImg || "",
                username: data.username || "",
                name: data.name || "",
            }, 'profile');
        }
    };

    useEffect(() => {
        getMyProfile();
    }, []);

    return (
        <div className="h-full w-full">
            <Cover/>
            <div className="p-10 mt-[-15%]">
                <ProfileCard
                    user={{
                        name: user?.name || "",
                        username: user?.username || "Guest",
                        image: user?.profileImg || "/placeholder.svg",
                        followerCount: 0,
                        followingCount: 0,
                        postsCount: user?.totalPosts || 0,
                        savedCount:0,
                        photosCount: user?.totalImageUploaded || 0,
                    }}
                    onEditProfile={() => setActiveModal('profile')}
                    loading={profileLoading || formSumitLoading?.get('profile') || false}
                    onTabChange={(tab) => setActiveTab(tab)}
                    />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <div  className="col-span-1 md:col-span-1 lg:col-span-1 space-y-4">
                        <BasicInfo
                            college={user?.details?.college || ""}
                            company={user?.details?.company || ""}
                            location={user?.details?.address || ""}
                            skills={user?.details?.skills || []}
                            loading={profileLoading || formSumitLoading?.get('basic') || false}
                            onEdit={() => setActiveModal('basic')}
                        />
                        <SummaryProfile
                            onEdit={() => setActiveModal('summary')}
                            summary= {user?.details?.bio || "No summary available"}
                            loading={profileLoading || formSumitLoading?.get('summary') || false}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        {renderTabContent(activeTab)}
                    </div>
                </div>
            </div>

             {/* Basic Info Modal */}
            <EditCardModal
                open={activeModal === 'basic'}
                onClose={() => setActiveModal(null)}
                onSave={handleSave}
                title="Edit Basic Info"
                fields={[
                    { name: 'college', label: 'College' },
                    { name: 'company', label: 'Company' },
                    { name: 'address', label: 'Address' },
                    {
                    name: 'skills',
                    label: 'Skills',
                    type: 'select',
                    placeholder: 'Enter skills and press Enter',
                    options: [],
                    },
                ]}
                initialValues={{
                    college: user?.details?.college || '',
                    company: user?.details?.company || '',
                    address: user?.details?.address || '',
                    skills: user?.details?.skills || [],
                }}
                />

            <EditCardModal
                open={activeModal === 'summary'}
                onClose={() => setActiveModal(null)}
                onSave={handleSave}
                title="Edit Summary"
                fields={[{ name: 'bio', label: 'Bio', placeholder: 'Enter your summary...' }]}
                initialValues={{ bio: user?.details?.bio || '' }}
            />

            <EditProfileModal
                open={activeModal === 'profile'}
                onClose={() => setActiveModal(null)}
                onSave={handleSave}
                onImageUpload={uploadProfileImage}
                initialValues={{
                    name: user?.name || '',
                    username: user?.username || '',
                    profileUrl: user?.profileImg || ''
                }}
            />

        </div>
    );
}

export default Profile;