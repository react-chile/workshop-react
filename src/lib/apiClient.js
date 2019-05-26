import CONFIG from '../constants/config';
import store from '../store'
import {isValidtoken} from '../actions/users';
// import { catchError } from 'rxjs/operators';

const setURLFromMode = () => {
  return store.getState().user.mode.toString() === 'dev' ? CONFIG.api_base_dev_wh : CONFIG.api_base;
};

export default class apiClient {
  
  constructor(config) {
    apiClient.config = { ...config }
  }

  // RUTAS END POINT
  static host() { return `${setURLFromMode()}`};

  static users(){ return '/users'};
  static family(){ return '/users/families'};
  static hub(){ return '/users/hubs'};
  
  static hubIdFamily(idFamily){ return `/users/families/${idFamily}/hubs`};

  static cameras(idFamilia){ return `/users/families/${idFamilia}/cameras/`};
  static rules(idFamilia){ return `/users/families/${idFamilia}/rules/`};

  static groups(){ return `/users/families/${idFamilia}/hubs/${idHub}/groups/`};
  
  static devices(idHub){ return `/users/hubs/${idHub}/devices/`};
  static sendFcmToken(){ return `/users/fcm/token`};
  
  static shutterUpMax(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/shutter/up/max`};
  static shutterUp(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/shutter/up`};
  
  static shutterDownMax(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/shutter/down/max`};
  static shutterDown(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/shutter/down`};

  static doorlockLock(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/door/lock`};
  static doorlockUnLock(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/door/unlock`};
  static doorlockCreateUser(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/door/users/add`};
  static doorlockDeleteUser(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/door/users/remove`};
    
  static hueOn(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/on`};
  static hueOff(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/off`};

  static hueParty(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/party`};
  static hueLevel(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/level`};
  static hueColor(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/color`};



  // https://api.enel.wehaus.com/api/v2/users/hubs/1087/devices/1459/hvac/mode
  // static thermostat(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/mode`};
  // static thermostatFan(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/fan/on`};
  // static thermostatSet(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/temp`};
 

  static thermostatMode(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/mode`};
  static thermostatCold(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/cold`};
  static thermostatHeat(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/heat`};
  static thermostatFanOn(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/fan/on`};
  static thermostatFanAuto(idHub, idDevices){ return `/users/hubs/${idHub}/devices/${idDevices}/hvac/fan/auto`};


  static rulesOn( idFamilies, idRules){ return `/users/families/${idFamilies}/rules/${idRules}/enable`};
  static rulesOff(idFamilies, idRules){ return `/users/families/${idFamilies}/rules/${idRules}/disabled`};


  // HEADER
  static headers() {

    if (apiClient.config.token) 
    {
      return {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': apiClient.config.token
      }
      
    } else {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }
  static headersTxt() {
    return {
      'Content-Type': 'application/txt'
    }
  }

  static isHttpValid(status) {
    switch (status) {
      case 200: return 'ok'
      case 201: return 'ok'
      case 202: return 'ok'
      default:  return 'error'
    }
  }



  static fetchApi = async (url, params) =>{
    
    request = new Request(`${url}`, params);    
    return await fetch(request)
    .then(data => {

      //console.log(`%c ::: API-FETCH ::: ${url}`, 'background: red; color: #fff');
      //console.log(data);
      //console.log(`%c ::: HTTP STATUS ::: ${data.status}`, 'background: #fff; color: blue');

      if (data.status===401){
        //console.log(`%c ::: ERROR TOKEN ::: ${data.status}`, 'background: blue; color: #fff');
        store.dispatch(isValidtoken({isValidToken: true}))
      }else{

      }
      return  data;
    })
    .catch(err => { return err })
  }

  // VALIDAR ESTADO CAMARA
  isOnlineCamara  = async (url) => {
    try{
      params = {
        method: 'GET',
        headers: new Headers( apiClient.headersTxt() ),
      }

      const data= await apiClient.fetchApi(
        url,
        params
      )
        
      return await data;
      
      } catch (e) {
        console.log('<< ERROR CAMARAS >>',e)
      }
  }
  // LLAMADAS API
  calLogout = async () => {

    params = {
      method: 'DELETE',
      headers: new Headers( apiClient.headers() ),
    }
    return apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.users()}/sign_out`,
      params
    )

  }

  callLogin = async (user) => {
    params = {
      method: 'POST',
      headers: new Headers( apiClient.headers() ),
      body: JSON.stringify(user)
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.users()}/sign_in`,
      params
    )

    const token = data.headers.get('Authorization')=== null ? '':data.headers.get('Authorization');
    const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
    const error = apiClient.isHttpValid(data.status) === 'error' ? body.error : '';
    const status = data.status === null ? 0 : data.status;

    const response={
      token: token,
      ...body,
      status: status,
      ok: data.ok,
      errorResponse: error
    };
    
    return await response;


  }
  
  callUserRegister = async (user) => {
    params = {
      method: 'POST',
      headers: new Headers( apiClient.headers() ),
      body: JSON.stringify(user)
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.users()}`,
      params
    )

    const token = data.headers.get('Authorization')=== null ? '':data.headers.get('Authorization');
    const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
    const error = apiClient.isHttpValid(data.status) === 'error' ? body.error : '';
    const status = data.status === null ? 0 : data.status;

    const response={
      token: token,
      ...body,
      status: status,
      ok: data.ok,
      errorResponse: error
    };

    
    return response;


  }

  callFamily = async () => {
    const header = apiClient.headers()
    
    params = {
      method: 'GET',
      headers: new Headers( header ),
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.family()}`,
       params
     )
    
    const error = apiClient.isHttpValid(data.status) === 'error' ? 'error' : '';
  
      const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
      const status = data.status === null ? 0 : data.status;
      
      const response={
        data: [ ...body.data ],
        status: status,
        ok: data.ok,
        errorResponse: error
       };
      
      return await response   
  }

  callHubs = async (idFamily=null) => {
    const header = apiClient.headers()
    
    params = {
      method: 'GET',
      headers: new Headers( header ),
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.hub()}`,
      params
    )
    const error = apiClient.isHttpValid(data.status) === 'error' ? 'error' : '';
  
      const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
      const status = data.status === null ? 0 : data.status;
      
      const response={
        data: [ ...body.data ],
        status: status,
        ok: data.ok,
        errorResponse: error
       };
      
      return await response   
  }

  callCreateHub = async (hub) => {
    params = {
      method: 'POST',
      headers: new Headers( apiClient.headers() ),
      body: JSON.stringify(hub)
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.hub()}`,
      params
    )      
    return await data;
  }

  callUpdateHub = async (hub, idHub) => {

    const URL=`${setURLFromMode()}${apiClient.hub()}/${idHub}`;

    params = {
      method: 'PUT',
      headers: new Headers( apiClient.headers() ),
      body: JSON.stringify(hub)
    }
    console.log('**API-CLIENT**',URL)
    console.log('**API-CLIENT**',params)
    const data= await apiClient.fetchApi(
      URL,
      params
    )      
    console.log('**API-CLIENT**',data)
    return await data;
  }
  
  callDeleteHub = async (idHub) => {

    const URL=`${setURLFromMode()}${apiClient.hub()}/${idHub}`;
      params = {
        method: 'DELETE',
        headers: new Headers( apiClient.headers() ),
      }
    console.log('**API-CLIENT**',URL)
    console.log('**API-CLIENT**',params)
    const data= await apiClient.fetchApi(
      URL,
      params
    )      
    console.log('**API-CLIENT**',data)
    return await data;
  }

  callCameras = async (idFamily=0) => {
    const header = apiClient.headers()
    
    params = {
      method: 'GET',
      headers: new Headers( header ),
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.cameras(idFamily)}`,
      params
    )
    
    const error = apiClient.isHttpValid(data.status) === 'error' ? 'error' : '';
    
    if(error === 'error'){
      return {
        ...data,
        errorResponse: error
      };
    }else{
      const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
      const status = data.status === null ? 0 : data.status;
      
      const response={
        data: [ ...body.data ],
        status: status,
        ok: data.ok,
        errorResponse: error
      };
      
      return await response
    }
    
  }
  
  callRules = async (idFamily=0) => {
    const header = apiClient.headers()
    
    params = {
      method: 'GET',
      headers: new Headers( header ),
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.rules(idFamily)}`,
      params
    )

    const error = apiClient.isHttpValid(data.status) === 'error' ? 'error' : '';
    
    if(error === 'error'){
      return {
        ...data,
        errorResponse: error
      };
    }else{
      const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
      const status = data.status === null ? 0 : data.status;
      
      const response={
        data: [ ...body.data ],
        status: status,
        ok: data.ok,
        errorResponse: error
      };
      
      return await response
    }
    
  }
  
  callCreateRule = async (idFamily=0, payload) => {
    params = {
      method: 'POST',
      headers: new Headers( apiClient.headers() ),
      body: JSON.stringify(payload)
    }

    console.log('API-callCreaterule - params', params)
    
    const response= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.rules(idFamily)}`,
      params
      )

      console.log(' -- RESPUESTA API AL CREAR RULE --', response)
    // const token = data.headers.get('Authorization')=== null ? '':data.headers.get('Authorization');
    // const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
    // const error = apiClient.isHttpValid(data.status) === 'error' ? body.error : '';
    // const status = data.status === null ? 0 : data.status;

    // const response={
    //   token: token,
    //   ...body,
    //   status: status,
    //   ok: data.ok,
    //   errorResponse: error
    // };
    
    return await response;


  }

  // DEVICES 
  callDevices = async (idhub=0) => {
    const header = apiClient.headers()
  
    params = {
      method: 'GET',
      headers: new Headers( header ),
    }
    const data= await apiClient.fetchApi(
      `${setURLFromMode()}${apiClient.devices(idhub)}`,
      params
    )

    const error = apiClient.isHttpValid(data.status) === 'error' ? 'error' : '';
    
    if(error === 'error'){
      return {
        ...data,
        errorResponse: error
      };
    }else{
      const body  = data._bodyText=== null ? '': JSON.parse(data._bodyText);
      const status = data.status === null ? 0 : data.status;
  
      const response={
        data: [ ...body.data ],
        status: status,
        ok: data.ok,
        errorResponse: error
      };
      
      return await response
    }
  
  }
// - Action Devices -
  callShutter = async (idHub=0, idDevices=0, action='') => {
    try {

      // action = UpMax or DownMax or Up or Down

      let URL='';
      params = {
        method: 'PUT',
        headers: new Headers( apiClient.headers() ),
      }

      if(action=== 'upMax'){
        URL=`${setURLFromMode()}${apiClient.shutterUpMax(idHub, idDevices)}`;

      }else if(action=== 'downMax'){
        URL=`${setURLFromMode()}${apiClient.shutterDownMax(idHub, idDevices)}`;
      
      }else if(action=== 'up'){
        URL=`${setURLFromMode()}${apiClient.shutterUp(idHub, idDevices)}`;
      
      }else if(action=== 'down'){
        URL=`${setURLFromMode()}${apiClient.shutterDown(idHub, idDevices)}`;
      }

      const data= await apiClient.fetchApi(
          URL,
          params
        )
        const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }

  callDoorLock = async (idHub=0, idDevices=0, action='off') => {
    
    try {  

      let URL='';
      params = {
        method: 'PUT',
        headers: new Headers( apiClient.headers() ),
      }
      if(action=== 'on'){
        URL=`${setURLFromMode()}${apiClient.doorlockUnLock(idHub, idDevices)}`;

      }else if(action=== 'off'){
        URL=`${setURLFromMode()}${apiClient.doorlockLock(idHub, idDevices)}`;
      }

      const data= await apiClient.fetchApi(
          URL,
          params
        )
      const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }

  callDoorLockCreateUser = async (idHub=0, idDevices=0, payload) => {
    console.log('< callDoorLockCreateUser payload >', idHub, idDevices, payload)
    try {  

      let URL='';
      params = {
        method: 'POST',
        headers: new Headers( apiClient.headers() ),
        body: JSON.stringify(payload)
      }
      console.log('< callDoorLockCreateUser params >', params)

      URL=`${setURLFromMode()}${apiClient.doorlockCreateUser(idHub,idDevices)}`;


      const data= await apiClient.fetchApi(
          URL,
          params
        )
      const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }
  callDoorLockDeleteUser = async (idHub=0, idDevices=0, payload) => {
    console.log('< callDoorLockDeleteUser payload >', idHub, idDevices, payload)
    try {  

      let URL='';
      params = {
        method: 'DELETE',
        headers: new Headers( apiClient.headers() ),
        body: JSON.stringify(payload)
      }
      console.log('< callDoorLockDeleteUser params >', params)

      URL=`${setURLFromMode()}${apiClient.doorlockDeleteUser(idHub,idDevices)}`;


      const data= await apiClient.fetchApi(
          URL,
          params
        )
      const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }
  
  callHueOnOff = async (idHub=0, idDevices=0, action='off') => {
    
    try {

      // action = on or off

      let URL='';
      params = {
        method: 'PUT',
        headers: new Headers( apiClient.headers() ),
      }
      

      if(action=== 'on'){
        URL=`${setURLFromMode()}${apiClient.hueOn(idHub, idDevices)}`;

      }else if(action=== 'off'){
        URL=`${setURLFromMode()}${apiClient.hueOff(idHub, idDevices)}`;
      }

      const data= await apiClient.fetchApi(
          URL,
          params
        )

        const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }

// HUE
  callHueColor = async (idHub=0, idDevices=0, action='',obj={}) => {
    
    try {

      let URL='';
      params = {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: new Headers( apiClient.headers() ),
      }
      

      if(action=== 'color'){
        URL=`${setURLFromMode()}${apiClient.hueColor(idHub, idDevices)}`;

      }else if(action=== 'party'){
        URL=`${setURLFromMode()}${apiClient.hueParty(idHub, idDevices)}`;
        
      }else if(action=== 'level'){
        URL=`${setURLFromMode()}${apiClient.hueLevel(idHub, idDevices)}`;
        
      } 

      const data= await apiClient.fetchApi(
          URL,
          params
        )
        const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }

  callSetHueDimmer = async (idHub=0, idDevices=0, obj={}) => {
    
    try {

      console.log('API-callSetHueDimmer',idHub,idDevices,obj )
      let URL='';
      params = {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: new Headers( apiClient.headers() ),
      }
      
      URL=`${CONFIG.setURLFromMode()}${apiClient.hueLevel(idHub, idDevices)}`;
        
      console.log('API-callSetHueDimmer - URL',URL )

      const data= await apiClient.fetchApi(
          URL,
          params
        )
        const response={
          ...data
        }
      
      console.log('API-callSetHueDimmer - response',response )

      // return await response;


    } catch (e) { console.log(e) }
  }

  // THERMOSTAT
  callThermostatMode = async (idHub=0, idDevices=0, mode='') => {
    try {

      let URL='';
      params = {
        method: 'PUT',
        headers: new Headers( apiClient.headers() ),
        body: JSON.stringify({"device":{"mode":mode}})
      }
      
      URL=`${setURLFromMode()}${apiClient.thermostatMode(idHub, idDevices)}`;
     
      console.log('<< API callThermostatMode params >>', params)
      console.log('<< API callThermostatMode >>', URL)


      const data= await apiClient.fetchApi(
          URL,
          params
        )

        const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }
  callThermostatSetFan = async (idHub=0, idDevices=0, fan=false) => {
    try {

      console.log('<< API:callThermostatSetFan idHub, idDevices, fan>>',idHub, idDevices, fan)

      let URL='';
      params = {
        method: 'PUT',
        headers: new Headers( apiClient.headers() ),
      }
      
      if(fan=== true){
        URL=`${setURLFromMode()}${apiClient.thermostatFanOn(idHub, idDevices)}`;

      }else if(fan=== false){
        URL=`${setURLFromMode()}${apiClient.thermostatFanAuto(idHub, idDevices)}`;
      }
      
     
      console.log('<< API callThermostatMode params >>', params)
      console.log('<< API callThermostatMode >>', URL)


      const data= await apiClient.fetchApi(
          URL,
          params
        )

        const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }
  
  callThermostatSet = async (idHub=0, idDevices=0, mode='off', temperature=0) => {
   
    try {
  
      let URL='';

      if(mode === 'cold'){
        URL=`${setURLFromMode()}${apiClient.thermostatCold(idHub, idDevices)}`;

      }else if(mode === 'heat'){
        URL=`${setURLFromMode()}${apiClient.thermostatHeat(idHub, idDevices)}`;
      }
      
      params = {
        method: 'PUT',
        headers: new Headers( apiClient.headers() ),
        body: JSON.stringify({"device":{"temp":temperature}})
      }
      console.log('<< API callThermostatMode params >>', params)
      console.log('<< API callThermostatSet URL>>', URL)


      const data= await apiClient.fetchApi(
          URL,
          params
        )

        const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }

  callRulesOnOff = async (idFamilies=0, idRules=0, action=false) => {
    
    try {

      // action = on or off

      let URL='';
      params = {
        method: 'PUT',
        headers: new Headers( apiClient.headers() ),
      }
      
      if(action=== true){
        URL=`${setURLFromMode()}${apiClient.rulesOn(idFamilies, idRules)}`;

      }else if(action=== false){
        URL=`${setURLFromMode()}${apiClient.rulesOff(idFamilies, idRules)}`;
      }


      const data= await apiClient.fetchApi(
          URL,
          params
        )

        const response={
          ...data
        }
      
      return await response;


    } catch (e) { console.log(e) }
  }

  // FIREBASE TOKEN
 callSendFcmToken = async (obj) => {
  //console.log('<< API >>', obj)
  params = {
    method: 'POST',
    headers: new Headers( apiClient.headers() ),
    body: JSON.stringify(obj)
  }
  const data= await apiClient.fetchApi(
    `${setURLFromMode()}${apiClient.sendFcmToken()}`,
    params
  )
  return data;


 }

}