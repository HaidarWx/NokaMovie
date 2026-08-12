export function ModalOverlay() {
  return (
    <>
      <div className="modal-overlay" role="dialog" aria-modal="true">
        <div className="modal-content">
          <div className="modal-header"></div>
          <div className="modal-body"></div>
          <div className="modal-footer">
            <button className="modal-close" aria-label="Close modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
