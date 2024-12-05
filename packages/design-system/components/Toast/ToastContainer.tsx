import { Toast } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';
const ToastContainer = () => {
  const { type, toast } = useToast();

  return toast && <Toast type={type} message={toast} />;
};

export default ToastContainer;
