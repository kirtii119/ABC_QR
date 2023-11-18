import {QrScanner} from '@yudiel/react-qr-scanner';

export const Scanner = (props) => {
  return (
      <QrScanner
          onDecode={(result) => {
            console.log('x', result)
            // props.setScan(false);
        } }
          onError={(error) => console.log(error?.message)}
          constraints={ {facingMode: 'environment'}}
  
      />
  );
}

