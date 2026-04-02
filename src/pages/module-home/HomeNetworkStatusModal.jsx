import { useNetwork } from 'ahooks';
import { Modal } from 'antd';

function HomeNetworkStatusModal({ open, onClose }) {
  const networkState = useNetwork();

  const getStatusIcon = () => {
    if (networkState.online) {
      return (
        <div className="mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
          <div className="i-ant-design:check-circle-outlined text-3xl text-green-500" />
        </div>
      );
    }

    return (
      <div className="mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
        <div className="i-ant-design:disconnect-outlined text-3xl text-red-500" />
      </div>
    );
  };

  const getStatusMessage = () => {
    if (!networkState.online) {
      return {
        type: 'error',
        message: '网络连接已断开',
        description: '您当前处于离线状态，请检查网络连接',
      };
    }

    const connectionType = networkState.effectiveType || 'unknown';
    const connectionDesc = {
      '2g': '2G 网络',
      '3g': '3G 网络',
      '4g': '4G 网络',
      '5g': '5G 网络',
      'unknown': '已连接',
    };

    return {
      type: 'success',
      message: '网络连接正常',
      description: connectionDesc[connectionType] || '已连接到网络',
    };
  };

  const statusInfo = getStatusMessage();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      width={400}
    >
      <div className="flex flex-col items-center py-6">
        {getStatusIcon()}
        <div className="mb-2 text-xl font-bold">{statusInfo.message}</div>
        <div className="text-center text-gray-500">{statusInfo.description}</div>

        {networkState.online && (
          <div className="mt-4 w-full rounded-lg bg-gray-50 p-3">
            <div className="text-sm text-gray-600">
              <div className="mb-1 flex justify-between">
                <span>网络类型:</span>
                <span className="font-medium">{networkState.effectiveType || '未知'}</span>
              </div>
              <div className="mb-1 flex justify-between">
                <span>下行速度:</span>
                <span className="font-medium">
                  {networkState.downlink || 0}
                  {' '}
                  Mbps
                </span>
              </div>
              <div className="flex justify-between">
                <span>延迟:</span>
                <span className="font-medium">
                  {networkState.rtt || 0}
                  {' '}
                  ms
                </span>
              </div>
            </div>
          </div>
        )}

        {!networkState.online && (
          <button
            onClick={onClose}
            className="mt-6 rounded-full bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600"
          >
            知道了
          </button>
        )}
      </div>
    </Modal>
  );
}

export default HomeNetworkStatusModal;
