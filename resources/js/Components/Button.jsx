



function PrimaryButton({disabled,children,...props}) {
    return (
        <div className="btn-area">
            <button className={`btn-area_btn ${disabled?"disabled":""}`} disabled={disabled} {...props}>
                            {children}
            </button>
        </div>
      
    );
}

function DangerButton({disabled,children,...props}) {
    return (
        <div className="btn-area">
            <button {...props} className={`btn-area_btn danger ${disabled?"disabled":""}`} disabled={disabled}>
                            {children}
            </button>
        </div>
      
    );
}


export {PrimaryButton ,DangerButton}
