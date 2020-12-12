package DPI.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DPI.dao.MemorandumInfoDao;
import DPI.entity.MemorandumInfo;
import DPI.service.MemorandumInfoService;

@Service
public class MemorandumInfoServiceImpl implements MemorandumInfoService{
	
	@Autowired
	private MemorandumInfoDao memorandumInfoDao;

	@Override
	public void insertMemorandumInfo(MemorandumInfo memorandumInfo) {
		// TODO Auto-generated method stub
		memorandumInfoDao.insertMemorandumInfo(memorandumInfo);
	}

	@Override
	public List<MemorandumInfo> loadAllMemorandumInfo(String openid) {
		// TODO Auto-generated method stub
		return memorandumInfoDao.loadAllMemorandumInfo(openid);
	}

	@Override
	public MemorandumInfo loadMemorandumInfoById(int id) {
		// TODO Auto-generated method stub
		return memorandumInfoDao.loadMemorandumInfoById(id);
	}

	@Override
	public void udateMemorandumInfoById(MemorandumInfo memorandumInfo) {
		// TODO Auto-generated method stub
		memorandumInfoDao.udateMemorandumInfoById(memorandumInfo);
	}
	
}
