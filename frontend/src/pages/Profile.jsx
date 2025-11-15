import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <div className="p-6">Please login first.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>

      <div className="bg-white shadow p-6 rounded-lg">
        <img src={user.avatar} className="w-24 h-24 rounded-full" />

        <h2 className="text-xl font-semibold mt-4">{user.fullName}</h2>
        <p className="text-gray-600">Account blocked: {user.isBlocked ? (<span className="text-red-600 font-medium">Yes</span>) : (<span className="text-green-600 font-medium">No</span>)}</p>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-2">{user.description}</p>

        <a
          href="/update-profile"
          className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </a>
      </div>
    </div>
  );
}
