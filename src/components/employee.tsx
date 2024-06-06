import { EllipsisVertical } from 'lucide-react';

export function Employee() {
  return (
    <div className="mt-5">
      <div className="w-full bg-gray-400 bg-opacity-45 rounded-md">
        <div className="flex flex-row justify-around items-center h-[80px] rounded-md">
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] bg-gray-500 rounded-full"></div>
            <div>
              <h3 className="text-2xl text-black font-semibold">LoremIpsum</h3>
              <p className="text-green-600">Active</p>
            </div>
          </div>
          <div>
            <p className="opacity-60">Email</p>
            <p>loremipsum@lorem.com</p>
          </div>
          <div>
            <p className="opacity-60">Role</p>
            <p>lorem</p>
          </div>
          <div>
            <p className="opacity-60">Department</p>
            <p>loremlorem</p>
          </div>
          <EllipsisVertical className="stroke-gray-600" />
        </div>
      </div>
    </div>
  );
}
