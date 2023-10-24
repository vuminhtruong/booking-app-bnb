import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi, faCar, faTv, faDog, faDoorClosed, faRadio, faKitMedical, faKitchenSet, faLock, faPumpSoap, faFire } from "@fortawesome/free-solid-svg-icons";

export default function Perks({selected,onChange}) {

    function handleChangeClick(e) {
        const {checked,name} = e.target;
        if(checked) {
            onChange([...selected,name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
        
    }

    return (
        <>
            <label>
                <input type='checkbox' checked={selected.includes('wifi')} name='wifi' onChange={handleChangeClick} />
                <FontAwesomeIcon className="my-auto mx-2" icon={faWifi} />
                <span>Wifi</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Free parking spot')} name="Free parking spot" onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faCar} />
                <span>Free parking spot</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('TV')} name='TV' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faTv} />
                <span>TV</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Pets')} name='Pets' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faDog} />
                <span>Pets</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Private entrance')} name='Private entrance' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faDoorClosed} />
                <span>Private entrance</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Radio')} name='Radio' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faRadio} />
                <span>Radio</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Firsr aid kit')} name='Firsr aid kit' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faKitMedical} />
                <span>First aid kit</span>
            </label>
            <label>
                <input type='checkbox' name='Kitchen' checked={selected.includes('Kitchen')} onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faKitchenSet} />
                <span>Kitchen</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('BBQ grill')} name='BBQ grill' onChange={handleChangeClick}/>
                <span className="material-symbols-outlined my-auto mx-1">
                    outdoor_grill
                </span>
                <span>BBQ grill</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Lockbox')} name='Lockbox' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faLock} />
                <span>Lockbox</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Essentials')} name='Essentials' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faPumpSoap} />
                <span>Essentials</span>
            </label>
            <label>
                <input type='checkbox' checked={selected.includes('Smole alarm')} name='Smoke alarm' onChange={handleChangeClick}/>
                <FontAwesomeIcon className="my-auto mx-2" icon={faFire} />
                <span>Smoke alarm</span>
            </label>
        </>
    );
}