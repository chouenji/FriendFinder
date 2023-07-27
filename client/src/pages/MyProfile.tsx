import { useEffect, useState } from 'react';
import { getUserById } from '../utils/utils';

function MyProfile(props: { user: User; token: string }) {
  const [userProfile, setUserProfile] = useState<User>();
  const [description, setDescription] = useState<string | undefined>();

  useEffect(() => {
    // If there is no token, return
    if (!props.token) {
      return;
    }

    const fetchUser = async () => {
      const user: User = await getUserById(props.user.id);
      setUserProfile(user);
    };

    fetchUser();
  }, [props.token, props.user.id]);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${props.user.id}/description`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description,
          }),
        }
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-center font-bold mb-3">My Profile</h1>
      <div className="flex flex-col items-center justify-center w-1/4 p-4">
        <img
          className="w-64 h-64 rounded-full"
          src={`data:image/png;base64, ${userProfile?.picture}`}
          alt={props.user.name}
        />
        <br />
        <p className="text-center">{userProfile?.name}</p>
        <br />
        <p className="text-center">{userProfile?.description}</p>
        <br />

        <form className="text-center" onSubmit={handleSubmit} method="post">
          <label htmlFor="name">Change Description</label>
          <br />
          <textarea
            className="h-32"
            name="name"
            id="name"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter a description of yourself"
          />
          <br />
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyProfile;
