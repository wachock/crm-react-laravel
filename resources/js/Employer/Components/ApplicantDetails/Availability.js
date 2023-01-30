import React from 'react'
import Table from 'react-bootstrap/Table';

export default function Availability() {
  return (
    <div>
      <div className='Availability'>
        <h5>Availability</h5>
        <p>Calender updated more than a month ago - Confirm the candidate's availability by sending a message</p>

        <Table responsive className='timeslots'>
            <tbody>
                <tr>
                <th>SUNDAY</th>
                <td>
                <div className="radio">
                    <label>
                        <input checked type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-1" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-2" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-3" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-4" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-5" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-6" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-7" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                </tr>
                <tr>
                <th>MONDAY</th>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-8" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-9" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-10" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-11" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-12" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-13" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-14" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                </tr>
                <tr>
                <th>TUESDAY</th>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-8" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-9" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-10" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-11" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-12" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-13" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-14" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                </tr>
                <tr>
                <th>WEDNESDAY</th>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-8" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-9" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-10" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-11" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-12" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-13" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-14" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                </tr>
                <tr>
                <th>THURSDAY</th>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-8" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-9" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-10" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-11" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-12" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-13" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-14" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                </tr>
                <tr>
                <th>FRIDAY</th>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-8" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-9" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-10" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-11" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-12" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-13" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-14" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                </tr>
                <tr>
                <th>SATURDAY</th>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-8" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-9" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-10" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-11" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-12" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-13" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                <td>
                <div className="radio">
                    <label>
                        <input type="checkbox"  onChange={e => setTimeslot(e.target.value)} value='6 AM - 8 AM' className="btn-check" id="bordered-radio-14" name="timeslot" />
                        <span className="forcustom">6 AM - 8 AM</span>
                    </label>
                </div>
                </td>
                </tr>

            </tbody>
        </Table>

      </div>
    </div>
  )
}
