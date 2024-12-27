declare module 'react-barcode-reader' {
    interface BarcodeReaderProps {
        onError: (error: Error) => void;
        onScan: (data: object) => void;
    }

    const BarcodeReader: React.FC<BarcodeReaderProps>;
    export default BarcodeReader;
}
