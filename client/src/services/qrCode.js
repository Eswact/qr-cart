import QRCode from 'qrcode';

export const createQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data, { errorCorrectionLevel: 'H' });
    } catch (error) {
        console.error('QR code generation error:', error);
        throw error;
    }
};