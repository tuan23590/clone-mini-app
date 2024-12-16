import ProfileActions from "./actions";
import FollowOAWidget from "./follow-oa";
import Points from "./points";

export default function ProfilePage() {
  return (
    <div className="min-h-full bg-section p-4 space-y-2.5">
      <Points />
      <ProfileActions />
      <FollowOAWidget />
    </div>
  );
}
