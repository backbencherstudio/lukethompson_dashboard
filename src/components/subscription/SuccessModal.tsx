import Image from "next/image";
import { Modal } from "../ui/Modal";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

export const SuccessModal = ({ isOpen, onClose, message }: SuccessModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <div className="flex flex-col items-center py-12">
                <div>
                    <Image src="/Illustration (2).png" alt="Success" width={240} height={240} />

                </div>
                <div className="max-w-[344px] text-center">
                    <h1 className="text-2xl font-bold text-white">New Membership Plan Added Successfully!</h1>
                    <p className="text-sm font-medium text-white-secondary text-center">
                        {message}
                    </p>
                </div>
            </div>
        </Modal>
    );
};