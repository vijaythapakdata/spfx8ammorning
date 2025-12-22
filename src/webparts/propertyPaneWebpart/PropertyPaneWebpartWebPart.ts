import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,PropertyPaneSlider,PropertyPaneDropdown,PropertyPaneChoiceGroup,PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'PropertyPaneWebpartWebPartStrings';
import PropertyPaneWebpart from './components/PropertyPaneWebpart';
import { IPropertyPaneWebpartProps } from './components/IPropertyPaneWebpartProps';

export interface IPropertyPaneWebpartWebPartProps {
   ListName:string; //textfield
 ToggleOptions:boolean;
 GenderOptions:string;
 Score:number;
 DropdownOptions:string;
 ButtonClick:string;
 Address:string; //textfield
}

export default class PropertyPaneWebpartWebPart extends BaseClientSideWebPart<IPropertyPaneWebpartWebPartProps> {

 

  public render(): void {
    const element: React.ReactElement<IPropertyPaneWebpartProps> = React.createElement(
      PropertyPaneWebpart,
      {
        ListName:this.properties.ListName,
        ToggleOptions:this.properties.ToggleOptions,
        GenderOptions:this.properties.GenderOptions,
        Score:this.properties.Score,
        DropdownOptions:this.properties.DropdownOptions,
        Address:this.properties.Address,
        ButtonClick:this.properties.ButtonClick
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('ListName', {
                  label: strings.ListFieldLabel
                }),
                PropertyPaneToggle('ToggleOptions',{
                  label:'Permission',
                  onText:'ON',
                  offText:'OFF',
                  
                }),
                PropertyPaneDropdown('DropdownOptions',{
                  label:'Department',
                  options:[
                    {key:'HR',text:'HR'},
                    {key:'IT',text:'IT'}
                  ]
                
                }
              ),
                PropertyPaneChoiceGroup('GenderOptions',{
                  label:'Gender',
                  options:[
                    {key:'Male',text:'Male'},
                    {key:'Female',text:'Female'}
                  ]
                }

                  
                ),
                PropertyPaneSlider('Score',{
                  label:'Score',
                  min:1,
                  max:100,
                  step:1
                }),
                // // PropertyPaneButton('ButtonClick',
                // //   {
                // //   onClick
                // //   }
                // )
                PropertyPaneTextField('Address',{
                  label:strings.AddressFieldLabel,
                  multiline:true,
                  rows:5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
