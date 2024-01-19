import { set } from 'firebase/database';
import { useState } from 'react';

type FieldEntryDialogProps<T> = {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setValue: (value: T) => void;
  confirmMe?: boolean;
};

export const FieldEntryDialog = <T,>({
  title,
  setValue,
  setIsOpen,
  isOpen,
  confirmMe = false,
}: FieldEntryDialogProps<T>) => {
  const [input, setInput] = useState('');
  const [confirmInput, setConfirmInput] = useState('');

  const handleSubmit = () => {
    if (confirmMe && input !== confirmInput) {
      alert('Entries do not match');
      return;
    }
    setValue(input as unknown as T);
    setIsOpen(false);
    setInput('');
    setConfirmInput('');
  };

  return (
    <dialog
      open={isOpen}
      style={{
        backgroundColor: 'darkblue',
        marginTop: '150px',
        borderColor: 'lightblue',
        borderWidth: '5px',
        width: '35vw',
      }}
    >
      <div className='field-entry-dialog'>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <h2>{title}</h2>
        </div>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <input
            style={{
              justifySelf: 'center',

              width: '90%',
              height: '40px',
              fontSize: '20px',
              backgroundColor: 'lightblue',
              borderWidth: '5px',
            }}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        {confirmMe && (
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <input
              style={{
                justifySelf: 'center',

                width: '90%',
                height: '40px',
                fontSize: '20px',
                backgroundColor: 'lightblue',
                borderWidth: '5px',
                marginTop: '10px',
              }}
              placeholder='Confirm'
              value={confirmInput}
              onChange={e => setConfirmInput(e.target.value)}
            />
          </div>
        )}
        <div
          style={{
            margin: '30px 0',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </div>
      </div>
    </dialog>
  );
};
