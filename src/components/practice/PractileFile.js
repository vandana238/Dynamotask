import React from 'react';
import "./Practice.scss";
import { Tooltip } from 'antd';

const PracticeFile = () => {
  const Responsedata =[
    {
        "text": "I want to book one ticket from Hyderabad to Detroit",
        "entities": [
            {
                "entity": {
                    "Id": null,
                    "Name": "source"
                },
                "normalization": {
                    "Id": null,
                    "Name": "hyd"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Hyderabad"
                },
                "startPos": 31,
                "endPos": 40
            },
            {
                "entity": {
                    "Id": null,
                    "Name": "dest"
                },
                "normalization": {
                    "Id": null,
                    "Name": "dtx"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Detroit"
                },
                "startPos": 44,
                "endPos": 51
            }
        ],
        "language": {
            "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
            "Name": "English"
        }
    },
    {
        "text": "I want to book one ticket from Hyderabad to Chicago",
        "entities": [
            {
                "entity": {
                    "Id": null,
                    "Name": "source"
                },
                "normalization": {
                    "Id": null,
                    "Name": "hyd"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Hyderabad"
                },
                "startPos": 31,
                "endPos": 40
            },
            {
                "entity": {
                    "Id": null,
                    "Name": "dest"
                },
                "normalization": {
                    "Id": null,
                    "Name": "ch"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Chicago"
                },
                "startPos": 44,
                "endPos": 51
            }
        ],
        "language": {
            "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
            "Name": "English"
        }
    },
    {
        "text": "I want to book one ticket from Visakhapatnam to Detroit",
        "entities": [
            {
                "entity": {
                    "Id": null,
                    "Name": "source"
                },
                "normalization": {
                    "Id": null,
                    "Name": "vskp"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Visakhapatnam"
                },
                "startPos": 31,
                "endPos": 44
            },
            {
                "entity": {
                    "Id": null,
                    "Name": "dest"
                },
                "normalization": {
                    "Id": null,
                    "Name": "dtx"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Detroit"
                },
                "startPos": 48,
                "endPos": 55
            }
        ],
        "language": {
            "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
            "Name": "English"
        }
    },
    {
        "text": "I want to book one ticket from Visakhapatnam to Chicago",
        "entities": [
            {
                "entity": {
                    "Id": null,
                    "Name": "source"
                },
                "normalization": {
                    "Id": null,
                    "Name": "vskp"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Visakhapatnam"
                },
                "startPos": 31,
                "endPos": 44
            },
            {
                "entity": {
                    "Id": null,
                    "Name": "dest"
                },
                "normalization": {
                    "Id": null,
                    "Name": "ch"
                },
                "synonms": {
                    "Id": null,
                    "Value": "Chicago"
                },
                "startPos": 48,
                "endPos": 55
            }
        ],
        "language": {
            "Id": "31A18135-21D8-4BE8-8993-372F179E144C",
            "Name": "English"
        }
    }
]; 


return (
    <div className="ant-list ant-list-split modalListStyle">
      {Responsedata.map((item, index) => (
        <div key={index} className="ant-list-item ml-0 d-inline-flex w-100 justify-content-lg-start">
          <label className="ant-checkbox-wrapper mr-4">
            <span className="ant-checkbox">
              <input type="checkbox" className="ant-checkbox-input" value="" />
              <span className="ant-checkbox-inner"></span>
            </span>
          </label>
          <li className="ant-list-item">
            <span style={{ whiteSpace: 'break-spaces', flex: '0 0 auto' }}>
              <div>
                {item.text.substring(0, item.entities[0].startPos)}
                <Tooltip title={(
                  <div>
                    <div><strong>Entity:</strong> {item.entities[0].entity.Name}</div>
                    <div><strong>Normalization:</strong> {item.entities[0].normalization.Name}</div>
                  </div>
                )}>
                  <span className="blue-text">{item.entities[0].synonms.Value}</span>
                </Tooltip>
                {item.text.substring(item.entities[0].endPos, item.entities[1].startPos)}
                <Tooltip title={(
                  <div>
                    <div><strong>Entity:</strong> {item.entities[1].entity.Name}</div>
                    <div><strong>Normalization:</strong> {item.entities[1].normalization.Name}</div>
                  </div>
                )}>
                  <span className="blue-text">{item.entities[1].synonms.Value}</span>
                </Tooltip>
                {item.text.substring(item.entities[1].endPos)}
              </div>
            </span>
          </li>
        </div>
      ))}
    </div>
  );
}

export default PracticeFile;








