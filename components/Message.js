export default function Message({ message }) {
    return (
        <div className="flex flex-row items-end">
            <p className="receive">{message}</p>
        </div>
    );
  }