import { Switch } from "../ui/Switch";

export const NotificationsSettings = () => {
    return (
        <div className="flex w-full flex-col gap-6 rounded-xl border border-border-light bg-form-bg p-6">
            <div className='flex flex-col gap-2'>
                <h2 className="text-2xl font-bold text-white">Push Notifications</h2>
                <p className="text-sm text-white-secondary">Get alerts for newly posted wages, confirmations when payments go through successfully, and notifications whenever any fresh update is available.</p>
            </div>

            <div className='flex flex-col gap-6'>
                {/*Confirmation Notifications */}
                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <h2 className="text-lg font-bold text-white">Subscription Notifications</h2>
                        <p className="text-sm text-white-secondary">Receive confirmation notification after placing the Subscription.</p>
                    </div>
                    <Switch id="airplane-mode" />
                </div>

                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <h2 className="text-lg font-bold text-white">Promotions and Offers</h2>
                        <p className="text-sm text-white-secondary">Receive push notification whenever the platform requires your attentions</p>
                    </div>
                    <Switch id="airplane-mode" />
                </div>

                <div className='flex flex-row items-center justify-between'>
                    <div>
                        <h2 className="text-lg font-bold text-white">Email Notifications</h2>
                        <p className="text-sm text-white-secondary">Receive push notification via E-mail</p>
                    </div>
                    <Switch id="airplane-mode" />
                </div>
            </div>
        </div>
    );
};