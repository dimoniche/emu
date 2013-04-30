
/**
 * Module dependencies.
 */

var http = require('http');
var net  = require('net');
var fs   = require('fs');

// список поддерживаемых приборов
var TSRV_24 = 0;

// обработчики архивов
var type_device = new Array(
    send_archive_tsrv24
);

// названия приборов
var name_device = new Array(
    'VZLJOT 76.30.03.19'
);

var CRC_ARC_TAB = new Array(

    0x0000,0xC0C1,0xC181,0x0140,0xC301,0x03C0,0x0280,0xC241,0xC601,0x06C0,0x0780,0xC741,0x0500,
    0xC5C1,0xC481,0x0440,0xCC01,0x0CC0,0x0D80,0xCD41,0x0F00,0xCFC1,0xCE81,0x0E40,0x0A00,0xCAC1,
    0xCB81,0x0B40,0xC901,0x09C0,0x0880,0xC841,0xD801,0x18C0,0x1980,0xD941,0x1B00,0xDBC1,0xDA81,
    0x1A40,0x1E00,0xDEC1,0xDF81,0x1F40,0xDD01,0x1DC0,0x1C80,0xDC41,0x1400,0xD4C1,0xD581,0x1540,
    0xD701,0x17C0,0x1680,0xD641,0xD201,0x12C0,0x1380,0xD341,0x1100,0xD1C1,0xD081,0x1040,0xF001,
    0x30C0,0x3180,0xF141,0x3300,0xF3C1,0xF281,0x3240,0x3600,0xF6C1,0xF781,0x3740,0xF501,0x35C0,
    0x3480,0xF441,0x3C00,0xFCC1,0xFD81,0x3D40,0xFF01,0x3FC0,0x3E80,0xFE41,0xFA01,0x3AC0,0x3B80,
    0xFB41,0x3900,0xF9C1,0xF881,0x3840,0x2800,0xE8C1,0xE981,0x2940,0xEB01,0x2BC0,0x2A80,0xEA41,
    0xEE01,0x2EC0,0x2F80,0xEF41,0x2D00,0xEDC1,0xEC81,0x2C40,0xE401,0x24C0,0x2580,0xE541,0x2700,
    0xE7C1,0xE681,0x2640,0x2200,0xE2C1,0xE381,0x2340,0xE101,0x21C0,0x2080,0xE041,0xA001,0x60C0,
    0x6180,0xA141,0x6300,0xA3C1,0xA281,0x6240,0x6600,0xA6C1,0xA781,0x6740,0xA501,0x65C0,0x6480,
    0xA441,0x6C00,0xACC1,0xAD81,0x6D40,0xAF01,0x6FC0,0x6E80,0xAE41,0xAA01,0x6AC0,0x6B80,0xAB41,
    0x6900,0xA9C1,0xA881,0x6840,0x7800,0xB8C1,0xB981,0x7940,0xBB01,0x7BC0,0x7A80,0xBA41,0xBE01,
    0x7EC0,0x7F80,0xBF41,0x7D00,0xBDC1,0xBC81,0x7C40,0xB401,0x74C0,0x7580,0xB541,0x7700,0xB7C1,
    0xB681,0x7640,0x7200,0xB2C1,0xB381,0x7340,0xB101,0x71C0,0x7080,0xB041,0x5000,0x90C1,0x9181,
    0x5140,0x9301,0x53C0,0x5280,0x9241,0x9601,0x56C0,0x5780,0x9741,0x5500,0x95C1,0x9481,0x5440,
    0x9C01,0x5CC0,0x5D80,0x9D41,0x5F00,0x9FC1,0x9E81,0x5E40,0x5A00,0x9AC1,0x9B81,0x5B40,0x9901,
    0x59C0,0x5880,0x9841,0x8801,0x48C0,0x4980,0x8941,0x4B00,0x8BC1,0x8A81,0x4A40,0x4E00,0x8EC1,
    0x8F81,0x4F40,0x8D01,0x4DC0,0x4C80,0x8C41,0x4400,0x84C1,0x8581,0x4540,0x8701,0x47C0,0x4680,
    0x8641,0x8201,0x42C0,0x4380,0x8341,0x4100,0x81C1,0x8081,0x4040
);

// модбас ответ архивов от тсрв-024м
{
    var tsrv024_archive = new Array(
        0x01,0x41,0xAC,
        0x52,0x9B,0xCD,0x7F,

        0x00,0x00,// Tнар
        0x00,0x00,// Tпит
        0x00,0x00,// Тот
        0x00,0x00,// Тнс
        0x05,0xA0,// Tреж

        0x00,0x00,//Тнс
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x20,0x03,
        0x00,0x00,
        0x00,0x00,

        0x00,0x00,// схема
        0x00,0x00,0x00,0x00,// флаги

        0x00,0x00,0x00,0x00,//W1
        0x00,0x00,0x00,0x00,//W2
        0x00,0x00,0x00,0x00,//M1

        0x00,0x00,0x00,0x00,// ТР
        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,

        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,

        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,

        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,

        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,

        0x00,0x00,
        0x00,0x00,
        0x00,0x00,
        0x00,0x00,

        0x00,0x00,//ХВ

        0xA6,0x4C,0x18,0xD5);

    var tsrv024_summ_archive = new Array(

        0x01,0x41,0xAC,
        0x52,0x9B,0xCD,0x7F,

        0x00,0x00,0x00,0x00,
        0x00,0x00,0x00,0x00,

        0x00,0x00,
        0x00,0x00,
        0x00,0x00

    );
}

function crcArcAdd(crc,c)
{
    return CRC_ARC_TAB[(crc^c)&0xFF]^((crc>>8)&0xFF);
};

function crcModbusHex(buf,length)
{
    var	crc = 65535;

    for (var i = 0, len = length; i < len; ++i)
    {
        crc = crcArcAdd(crc, buf[i]);
    }

    return crc;
};

function crcfunc(buf,len)
{
    var i,j;
    var crc = 0;

    i = 2;
    len-=2;

    while ( len-- > 0 )
    {
        var tmp = buf[i];
        crc = ((crc&0xFFFF) ^ tmp << 8)&0xFFFF;
        i++;
        for ( j=0; j < 8; j++ )
        {
            if((crc&0x8000)>0) crc = (((crc << 1)&0xFFFF) ^ 0x1021)&0xFFFF;
            else crc = (crc&0xFFFF) << 1;
        }
    }

    buf[i]   = (crc&0xFF00)>>8;
    buf[i+1] = crc&0xFF;
}

var DLE = 0x10;
var SOH = 0x01;
var IS1 = 0x1F;
var STX = 0x02;
var ETX = 0x03;
var HT  = 0x09;
var FF  = 0x0c;

function send_name(name_device)
{
    var buf = new Buffer(name_device.length + 19);
    var tmp = new Buffer(name_device.length + 5);

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x3b;
        buf[7] = 0x8a;  //?????
        buf[8] = DLE;
        buf[9] = STX;
    }

    tmp[0]= buf[10]  = 0x01;
    tmp[1]= buf[11] = 0x11;
    tmp[2]= buf[12] = name_device.length;

    buf.write(name_device,13);
    tmp.write(name_device,3);

    var crc = crcModbusHex(tmp,3 + name_device.length);

    buf[13+name_device.length] = crc&0xFF;
    buf[14+name_device.length] = (crc&0xFF00)>>8;

    buf[15+name_device.length] = DLE;
    buf[16+name_device.length] = ETX;

    crcfunc(buf,17+name_device.length);

    return buf;
}

function send_number()
{
    var buf = new Buffer(23);

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x3b;
        buf[7] = 0x8a;  ///?????
        buf[8] = DLE;
        buf[9] = STX;
    }

    {
        buf[10] = 0x01;
        buf[11] = 0x03;
        buf[12] = 0x04;
        buf[13] = 0x00;
        buf[14] = 0x0c;
        buf[15] = 0x3e;
        buf[16] = 0xb5;
        buf[17] = 0xeb;
        buf[18] = 0xe7;
    }

    buf[19] = DLE;
    buf[20] = ETX;

    crcfunc(buf,21);

    return buf;
}

function send_US(number)
{
    var buf = new Buffer(21);

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x3b;
        buf[7] = 0x8a;  ///?????
        buf[8] = DLE;
        buf[9] = STX;
    }

    {
        buf[10] = 0x01;
        buf[11] = 0x03;
        buf[12] = 0x02;
        buf[13] = 0x00;
        buf[14] = 0x00;
        buf[15] = 0xb8;
        buf[16] = 0x44;
    }

    buf[17] = DLE;
    buf[18] = ETX;

    crcfunc(buf,19);

    return buf;
}

function send_archive_tsrv24(data)
{
    var buf = new Buffer(15 + 3*(tsrv024_archive.length));

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x3b;
        buf[7] = 0x8a;  ///?????
        buf[8] = DLE;
        buf[9] = STX;
    }

    for(var j = 0; j < 3;j++)
    {
        var tmp = new Buffer(tsrv024_archive.length);

        for(var i = 0; i < tsrv024_archive.length;i++)
        {
            buf[10 + i + j*tsrv024_archive.length] = tsrv024_archive[i];
            tmp[i] = tsrv024_archive[i];
        }

        // текущая дата
        /*{
            var date = new Date();
            var second = Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),date.getHours(), date.getMinutes(),date.getSeconds())/1000;

            tmp[6] = buf[16] = second&0x000000FF;
            tmp[5] = buf[15] = (second&0x0000FF00)>>8;
            tmp[4] = buf[14] = (second&0x00FF0000)>>16;
            tmp[3] = buf[13] = (second&0xFF000000)>>24;
        }*/

        var crc = crcModbusHex(tmp,tsrv024_archive.length-2);

        buf[i + j*tsrv024_archive.length-2 + 11] = crc&0xFF;
        buf[i + j*tsrv024_archive.length + 12] = (crc&0xFF00)>>8;
    }

    {   // суммарный архив
        for(var i = 0; i < tsrv024_summ_archive.length;i++)
        {
            buf[10 + 3*tsrv024_archive.length + i] = tsrv024_summ_archive[i];
            tmp[i] = tsrv024_summ_archive[i];
        }

        var crc = crcModbusHex(tmp,tsrv024_summ_archive.length-2);

        buf[i + 11] = crc&0xFF;
        buf[i + 12] = (crc&0xFF00)>>8;
    }

    buf[3*tsrv024_archive.length + tsrv024_summ_archive.length + 11] = DLE;
    buf[3*tsrv024_archive.length + tsrv024_summ_archive.length + 12] = ETX;

    crcfunc(buf,3*tsrv024_archive.length + tsrv024_summ_archive.length + 13);

    return buf;
}

function send_OK()
{
    var buf = new Buffer(15);

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x7f;
        buf[7] = DLE;
        buf[8] = STX;
    }

    {
        buf[9]  = HT;
        buf[10] = FF;
    }

    buf[11] = DLE;
    buf[12] = ETX;

    crcfunc(buf,13);

    return buf;
}

// логика отсылки архивной информации
function send_response_archive(stream,data,type)
{
    setTimeout(function(){
        stream.write(send_name(name_device[type]));
        setTimeout(function(){
            stream.write(send_number());
            setTimeout(function(){
                stream.write(send_US(1));
                setTimeout(function(){
                    stream.write(send_US(2));
                    setTimeout(function(){
                        stream.write(send_US(3));
                        setTimeout(function(){
                            stream.write(send_US(4));
                            setTimeout(function(){
                                stream.write(send_US(5));
                                setTimeout(function(){
                                    stream.write((type_device[type])(data));
                                    setTimeout(function(){
                                        stream.write(send_OK());
                                    },500);
                                },500);
                            },500);
                        },500);
                    },500);
                },500);
            },500);
        },500);
    },500);
}

var info =
{
    ident_string: '1000\0\0\0\0\0',

    current_min:        0,
    current_hour:       0,
    current_day:        0,
    current_mounth:     0,
    current_year:       0,

    kernel_version:     26,
    driver_type:        0x21,
    driver_version:     0x0b,

    bit:                0xC0,

    countUS:            0,
    lenghtUS:           0x0c
};

// инфо об ассв
function assv_info()
{
    var buf = new Buffer(33);

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x3f;
        buf[7] = DLE;
        buf[8] = STX;
    }

    {
        var date = new Date();
        buf.write(info.ident_string,9,9);
        buf[18] = date.getMinutes();
        buf[19] = date.getHours();
        buf[20] = date.getDate();
        buf[21] = date.getMonth();
        buf[22] = date.getFullYear() - 2000;

        buf[23] = info.kernel_version;
        buf[24] = info.driver_type;
        buf[25] = info.driver_version;

        buf[26] = info.bit;
        buf[27] = info.countUS;
        buf[28] = info.lenghtUS;
    }

    buf[29] = DLE;
    buf[30] = ETX;

    crcfunc(buf,31);

    return buf;
}

function send_modbus_name(name_device,code)
{
    var buf = new Buffer(name_device.length + 19);
    var tmp = new Buffer(name_device.length + 5);

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x29;
        buf[7] = code;
        buf[8] = DLE;
        buf[9] = STX;
    }

    tmp[0] = buf[10] = 0x01;
    tmp[1] = buf[11] = 0x11;
    tmp[2] = buf[12] = name_device.length;

    buf.write(name_device,13);
    tmp.write(name_device,3);

    var crc = crcModbusHex(tmp,3 + name_device.length);

    buf[13+name_device.length] = crc&0xFF;
    buf[14+name_device.length] = (crc&0xFF00)>>8;

    buf[15+name_device.length] = DLE;
    buf[16+name_device.length] = ETX;

    crcfunc(buf,17+name_device.length);

    return buf;
}

function send_modbus_register(data)
{
    var buf = new Buffer(14 + 5 + (data[15] * 2));
    var tmp = new Buffer(5 + (data[15] * 2));

    var len = 3;

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x29;
        buf[7] = data[7];
        buf[8] = DLE;
        buf[9] = STX;
    }

    {
        tmp[0] = buf[10] = 0x01;
        tmp[1] = buf[11] = 0x03;
        tmp[2] = buf[12] = (data[15] * 2);

        for(var i = 0; i < (data[15] * 2); i++)
        {
            tmp[3 + i] = buf[13 + i] = 0; // здесь нужно сувать данные
            len++;
        }

        var crc = crcModbusHex(tmp,len);

        buf[13 + (data[15] * 2)] = crc&0xFF;
        buf[14 + (data[15] * 2)] = (crc&0xFF00)>>8;
    }

    buf[15 + (data[15] * 2)] = DLE;
    buf[16 + (data[15] * 2)] = ETX;

    crcfunc(buf,17 + (data[15] * 2));

    console.log('ответ',buf);

    return buf;
}

function send_modbus_archive(data)
{
    var buf = new Buffer(14 + tsrv024_archive.length);

    // заголовок СПД
    {
        buf[0] = DLE;
        buf[1] = SOH;
        buf[2] = 0x00;
        buf[3] = 0x00;
        buf[4] = DLE;
        buf[5] = IS1;
        buf[6] = 0x29;
        buf[7] = data[7];
        buf[8] = DLE;
        buf[9] = STX;
    }

    {
        var tmp = new Buffer(tsrv024_archive.length);

        for(var i = 0; i < tsrv024_archive.length;i++)
        {
            buf[10 + i] = tsrv024_archive[i];
            tmp[i] = tsrv024_archive[i];
        }

        var crc = crcModbusHex(tmp,tsrv024_archive.length-2);

        buf[i + 11] = crc&0xFF;
        buf[i + 12] = (crc&0xFF00)>>8;
    }

    buf[tsrv024_archive.length + 11] = DLE;
    buf[tsrv024_archive.length + 12] = ETX;

    crcfunc(buf,tsrv024_archive.length + 13);

    console.log('ответ',buf);

    return buf;
}

function send_answer_modbus(data,type)
{
    var modbus_func = data[11];
    var code = data[7];

    if(modbus_func == 0x11)
    {   // идентификационная строка
        return send_modbus_name(name_device[type],code);
    }
    else if(modbus_func == 0x03)
    {   // запрос регистров
        return send_modbus_register(data);
    }
    else if(modbus_func == 0x41)
    {   // запрос архивов
        return send_modbus_archive(data);
    }
}

function prepare_response(stream,data,type)
{
    if(data[0] == DLE && data[1] == SOH)
    {   // если это запрос СПДанные
        if(data[6] == 0x3a)
        {   // запрос архива
            send_response_archive(stream,data,type);
        }
        else if(data[6] == 0x3e)
        {   // запрос информации об адаптере
            setTimeout(function(){
                stream.write(assv_info());
            },500);
        }
        else if(data[6] == 0x28)
        {   // модбас запрос к прибору
            setTimeout(function(){
                stream.write(send_answer_modbus(data,type));
            },500);
        }
    }
}

function assv_emulator(port,type)
{
    var server;
    server = net.createServer(function (stream) {
        console.log('server connected');

        stream.on('data', function (data) {

            console.log(data);

            // разберем ответ
            prepare_response(stream, data, type);

        });

        stream.on('close', function () {
            console.log('server connection close');
        });
        stream.on('end', function () {
            console.log('server disconnected');
        });
        stream.on('error', function () {
            console.log('server error');
        });
    });

    server.listen(port, function() {
        console.log('server bound');
    });
}

assv_emulator(3000, TSRV_24);
